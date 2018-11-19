import { info } from 'loglevel';
import EventEmitter = require('events');

import { StorageService } from 'services/StorageService';

import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { ProfileController } from 'app/profiles/profileController';

import { getWalletsCount } from 'helpers/profiles';

import {
  PROFILE_GET_CURRENT,
  PROFILE_CREATE_DONE,
  PROFILE_GETLIST,
  PROFILE_SELECT,
  PROFILE_UPDATE,
  PROFILE_REMOVE,
  PROFILE_EXPORT,
  PROFILE_IMPORT,
  PROFILE_IMPORT_QRCODE
} from 'constants/profile';
import { Profile } from 'models/Profile';

export class ProfileListController extends EventEmitter {
  private list: string[] = [];
  private current = null;

  private accessController: AccessController;
  private messageController: MessageController;
  private profileController: ProfileController;

  constructor (opts) {
    super();

    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.profileController = opts.profileController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening () {
    this.messageController.on(PROFILE_GET_CURRENT, this.responseGetCurrent);
    this.messageController.on(PROFILE_CREATE_DONE, this.responseCreateDone);

    this.messageController.on(PROFILE_SELECT, this.responseSelect);
    this.messageController.on(PROFILE_GETLIST, this.responseGetList);

    this.messageController.on(PROFILE_UPDATE, this.responseUpdate);
    this.messageController.on(PROFILE_REMOVE, this.responseRemove);

    this.messageController.on(PROFILE_EXPORT, this.responseExport);
    this.messageController.on(PROFILE_IMPORT, this.responseFileImport);
    this.messageController.on(PROFILE_IMPORT_QRCODE, this.responseQrCodeImport);
  }

  /**
   * Get active profile
   */
  private responseGetCurrent = (sendResponse: InternalResponseFn) => {
    const data = this.current
      ? {
          success: true,
          payload: {
            profileId: this.current
          }
        }
      : { success: false };

    sendResponse(data);
  };

  /**
   * Create new Profile on seed
   */
  private responseCreateDone = (sendResponse: InternalResponseFn, { payload: { seed } }) => {
    const profile = new Profile(seed);

    this.addProfile(profile);

    sendResponse({
      success: true,
      payload: {
        profileId: profile.id
      }
    });
  };

  /**
   * Select certain Profile and emit event that Profile changed
   */
  private responseSelect = async (sendResponse: InternalResponseFn, { payload: { profileId } }) => {
    sendResponse({
      success: true,
      payload: {
        current: await this.activate(profileId)
      }
    });
  };

  /**
   * Return list of profiles with info
   */
  private responseGetList = (sendResponse: InternalResponseFn) => {
    this.loadProfilesAndCurrent().then(payload => {
      sendResponse({
        success: true,
        payload
      });
    });
  };

  /**
   * Update certain Profile
   */
  private responseUpdate = (sendResponse: InternalResponseFn, { payload: { id, data } }) => {
    this.profileController
      .updateName(id, data.name)
      .then(this.loadProfilesAndCurrent)
      .then(payload => {
        sendResponse({
          success: true,
          payload
        });
      });
  };

  /**
   * Export profile
   */
  private responseExport = (sendResponse: InternalResponseFn, { payload: { id } }) => {
    this.profileController.export(id).then(encodedProfile => {
      sendResponse({
        success: true,
        payload: {
          encodedProfile
        }
      });
    });
  };

  /**
   * Import qrcode profile
   */
  private responseQrCodeImport = (sendResponse: InternalResponseFn, { payload: { pass, encryptedProfile } }) => {
    const rawProfile = JSON.parse(this.accessController.decode(encryptedProfile));

    const profile = Profile.fromJSON(rawProfile);

    this.addProfile(profile);

    sendResponse({
      success: true
    });
  };

  /**
   * Import file profile
   */
  private responseFileImport = (sendResponse: InternalResponseFn, { payload: { pass, encryptedProfile } }) => {
    const rawProfile = JSON.parse(this.accessController.decode(encryptedProfile));
    const profile = Profile.fromJSON(rawProfile);

    this.addProfile(profile);

    this.responseGetList(sendResponse);
  };

  /**
   * Remove certain Profile
   */
  private responseRemove = (sendResponse: InternalResponseFn, { payload: { id } }) => {
    if (id === this.current) {
      this.profileController.clear();
      this.current = null;

      StorageService.ProfileList.setCurrnet(null);
    }

    this.list = this.list.filter(prId => prId !== id);

    StorageService.ProfileList.set(this.list)
      .then(() => StorageService.Entities.remove(id))
      .then(() => {
        if (this.list[0]) {
          this.activate(this.list[0]);
        }

        return this.current;
      })
      .then(this.loadProfilesAndCurrent)
      .then(payload => {
        sendResponse({
          success: true,
          payload
        });
      });
  };

  /**
   * Read profile list from storage and restore all profiles
   */
  public init (): Promise<string[]> {
    return Promise.all([StorageService.ProfileList.get(), StorageService.ProfileList.getCurrent()]).then(
      ([list, current]) => {
        this.list = list || this.list;

        if (current) {
          this.current = current;
        } else {
          if (list && list[0]) {
            const first = list[0];

            this.setCurrrent(first);
          }
        }

        info('load profiles complete');
        return this.current;
      }
    );
  }

  /**
   * Add Profile in List and save list in storage
   * @param profile ProfileData
   */
  private addProfile (profile: Profile): string[] {
    this.list.push(profile.id);
    StorageService.ProfileList.set(this.list);

    this.profileController.save(profile);

    return this.list;
  }

  /**
   * Activate Profile
   * @param profileId
   */
  private async activate (profileId: string): Promise<any> {
    return new Promise((res, rej) => {
      if (!this.list.includes(profileId)) {
        return rej(false);
      }

      this.profileController
        .activateProfile(profileId)
        .then(() => {
          this.setCurrrent(profileId);
          res(profileId);
        })
        .catch(rej);
    });
  }

  /**
   * Set new current account
   * @param profile
   */
  private setCurrrent (profileId: string) {
    this.current = profileId;
    return StorageService.ProfileList.setCurrnet(profileId);
  }

  /**
   * Load common information about profiles
   */
  private loadProfiles (): Promise<ProfileInfo[]> {
    return Promise.all(this.list.map(id => StorageService.Entities.get(id))).then(profiles => {
      return profiles.map((profile: Profile) => ({
        name: profile.name,
        id: profile.id,
        wallets: getWalletsCount(profile)
      }));
    });
  }

  /**
   * Hooks to enrich data
   */
  private loadProfilesAndCurrent = () => {
    return this.loadProfiles().then(list => ({
      list,
      current: this.current
    }));
  };
}
