import { getProfiles, setProfiles } from '../../models/getter';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import ProfileFactory from './profileFactory';
import AccountFactory from '../account/accountFactory';

import { PROFILE_GETLIST, PROFILE_ADD, PROFILE_SELECT } from './../../constants/profile';
import { Profile } from './Profile';

export class ProfileListController {
  private list: any[] = null;
  private current = null;

  private accessController: AccessController;
  private messageController: MessageController;

  constructor(opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening() {
    this.messageController.on(PROFILE_GETLIST, this.responseList);
    this.messageController.on(PROFILE_ADD, this.responseAdd);
    this.messageController.on(PROFILE_SELECT, this.responseSelect);
  }

  /**
   * Response with list of profiles
   */
  private responseList = sendResponse => {
    sendResponse({
      list: this.getListSerialized(),
      profileId: this.current.getId()
    })
  }

  /**
   * Add new empty Profile and response with all profiles
   */
  private responseAdd = sendResponse => {
    this.createDefault();

    sendResponse({
      list: this.getListSerialized(),
      profileId: this.current.getId()
    });
  }
  
  /**
   * Select certain Profile
   */
  private responseSelect = (sendResponse, selectId) => {
    const selectedProfile = this.findById(selectId);
    this.setCurrrent(selectedProfile);

    sendResponse({
      profileId: this.current.getId()
    });
  }

  /**
   * Read profile list from storage and restore all profiles
   */
  public init() {
    return this._loadProfileList()
      .then(profiles => {
        if (profiles && profiles.length > 0) {
          // TODO: load last choosen profile
          const firstProfile = profiles[0];
  
          return this.setCurrrent(firstProfile);
        } else {
          return this.createDefault();
        };
      })
  }

  /**
   * Return current Profile
   */
  public getCurrent(): Profile {
    return this.current;
  }

  private _loadProfileList() {
    return getProfiles()
      .then((ids: any[]) => {
        if (ids && ids.length > 0) {
          return Promise.all(
            ids.map(id => {
              return ProfileFactory.load(this.accessController.getPass(), id);
            })
          );
        } else {
          return [];
        }
      })
      .then(profiles => {
        this.list = profiles || [];
        return this.list;
      });
  }

  /**
   * Return list of profiles
   */
  private getListSerialized() {
    return this.list.map(profile => profile.serialize());
  }

  /**
   * Create new default profile
   */
  private createDefault() {
    const profile = ProfileFactory.createDefault();

    ProfileFactory.create(this.accessController.getPass(), profile);
    this.addProfileInList(profile);

    return this.setCurrrent(profile);
  }

  /**
   * Set new current account
   * @param profile 
   */
  private setCurrrent(profile) {
    this.current = profile;

    return this.current;
  }

  /**
   * Add Profile in List and save list in storage
   * @param profile ProfileData
   */
  private addProfileInList(profile) {
    this.list.push(profile);
    this.save();

    return this.list;
  }

  /**
   * Save List of profiles in storage
   */
  private save(): Promise<void> {
    const profileIds = this.list.map(profile => profile.getId());

    return setProfiles(profileIds);
  }

  /**
   * Return profile with certian Id
   * @param profileId 
   */
  private findById(profileId) {
    return this.list.find((profile: Profile) => profile.getId() === profileId);
  }


  remove(id) {
    const profile = this.findById(id);
    const idx = this.list.findIndex(profile => profile.getId() === id);

    if (idx > -1) {
      this.list.splice(idx, 1);
      this.save();

      ProfileFactory.remove(id);
      AccountFactory.removeList(profile.getAccounts());
    }
  }

  update(pass, id, data) {
    const idx = this.list.findIndex(profile => profile.getId() === id);
    if (idx > -1) {
      this.list[idx].update(pass, data);

      this.save();
    }
  }


}
