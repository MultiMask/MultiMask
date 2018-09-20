import EventEmitter = require('events');

import { getProfiles, setProfiles } from 'services/getter';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import ProfileFactory from './profileFactory';
import AccountFactory from '../account/accountFactory';
import {AccountController} from '../account/accountController';

import { 
  PROFILE_GETLIST, 
  PROFILE_ADD, 
  PROFILE_SELECT, 
  PROFILE_REMOVE, 
  PROFILE_UPDATE,
  PROFILE_EXPORT,
  PROFILE_IMPORT
 } from 'constants/profile';
import { Profile } from './Profile';

export class ProfileListController extends EventEmitter {
  private list: any[] = null;
  private current = null;

  private accessController: AccessController;
  private messageController: MessageController;
  private accountController: AccountController;

  constructor (opts) {
    super();

    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    this.accountController = opts.accountController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening () {
    this.messageController.on(PROFILE_GETLIST, this.responseList);
    this.messageController.on(PROFILE_ADD,     this.responseAdd);
    this.messageController.on(PROFILE_SELECT, this.responseSelect);
    this.messageController.on(PROFILE_REMOVE, this.responseRemove);
    this.messageController.on(PROFILE_UPDATE, this.responseUpdate);
    
    this.messageController.on(PROFILE_EXPORT, this.responseExport);
    this.messageController.on(PROFILE_IMPORT, this.responseImport);
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
   * Select certain Profile and emit event that Profile changed
   */
  private responseSelect = (sendResponse, selectId) => {
    const selectedProfile = this.findById(selectId);
  
    if (selectedProfile) {
      this.setCurrrent(selectedProfile);
      this.emit(PROFILE_SELECT, selectedProfile);
    }

    sendResponse({
      profileId: this.current.getId()
    });
  }

  /**
   * Remove certain Profile
   */
  private responseRemove = (sendResponse, profileId) => {
    this.remove(profileId);

    sendResponse({
      list: this.getListSerialized(),
      profileId: this.current.getId()
    });
  }

  /**
   * Update certain Profile
   */
  private responseUpdate = (sendResponse, {id, data}) => {
    this.update(id, data);

    sendResponse({
      list: this.getListSerialized(),
      profileId: this.current.getId()
    });
  }

  /**
   * Export profile
   */
  private responseExport = (sendResponse, id) => {
    this.export(id).then(encodedProfile => {
      sendResponse({
        encodedProfile
      });
    })
  }

  private responseImport = (sendResponse, { pass, encryptedProfile }) => {
    this.import(pass, encryptedProfile);
    
    sendResponse({
      list: this.getListSerialized(),
      profileId: this.current.getId()
    });
  }

  /**
   * Read profile list from storage and restore all profiles
   */
  public init () {
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
  public getCurrent (): Profile {
    return this.current;
  }

  /**
   * Load profile list from storage
   */
  private _loadProfileList () {
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
  private getListSerialized () {
    return this.list.map(profile => profile.serialize());
  }

  /**
   * Create new default profile
   */
  private createDefault () {
    const profile = ProfileFactory.createDefault();

    ProfileFactory.create(this.accessController.getPass(), profile);
    this.addProfileInList(profile);

    return this.setCurrrent(profile);
  }

  /**
   * Set new current account
   * @param profile 
   */
  private setCurrrent (profile) {
    this.current = profile;

    return this.current;
  }

  /**
   * Add Profile in List and save list in storage
   * @param profile ProfileData
   */
  private addProfileInList (profile) {
    this.list.push(profile);
    this.save();

    return this.list;
  }

  /**
   * Save List of profiles in storage
   */
  private save (): Promise<void> {
    const profileIds = this.list.map(profile => profile.getId());

    return setProfiles(profileIds);
  }

  /**
   * Return profile with certian Id
   * @param profileId 
   */
  private findById (profileId) {
    return this.list.find((profile: Profile) => profile.getId() === profileId);
  }

  /**
   * Remove Profile from the list and from storage
   * @param id 
   */
  private remove (id) {
    if (id !== this.getCurrent().getId()) {
      const profile = this.findById(id);
      const idx = this.list.findIndex(profile => profile.getId() === id);
  
      if (idx > -1) {
        this.list.splice(idx, 1);
        this.save();
  
        ProfileFactory.remove(id);
        AccountFactory.removeList(profile.getAccounts());
      }
    }
  }

  /**
   * Update name of Profile
   * @param id 
   * @param data 
   */
  private update (id, data) {
    const idx = this.list.findIndex(profile => profile.getId() === id);
    if (idx > -1) {
      this.list[idx].update(this.accessController.getPass(), data);
    }
  }

  /**
   * Create profile from data
   * @param data 
   */
  private create (data) {
    const profile = new Profile(data);

    ProfileFactory.create(this.accessController.getPass(), profile);
    this.addProfileInList(profile);
  }

  /**
   * Load Profile full model and encrypt
   * @param id 
   */
  private export (id: string) {
    return this.getFullInfo(id).then(profile => {
      return ProfileFactory.encryptFullProfile(this.accessController.getPass(), profile, true);
    });
  }

  /**
   * Get Profile Info with serialized wallets
   * @param id 
   */
  private async getFullInfo (id: string) {
    const profile = this.findById(id);

    if (profile) {
      return AccountFactory.loadListSerializedByIds(
        this.accessController.getPass(), profile.getAccounts()
      ).then(accounts => {
        profile.wallets = accounts;

        return profile;
      });
    } else {
      return Promise.resolve();
    }
  }

  /**
   * Import encrypted profile
   * @param pass 
   * @param encryptedProfile 
   */
  private import (pass, encryptedProfile) {
    const decryptProfile = ProfileFactory.decryptFullProfile(pass, encryptedProfile);

    if (!decryptProfile) return;

    const oldProfile = this.findById(decryptProfile.data.id);

    if (!oldProfile) {
      decryptProfile.wallets.map(wallet => this.accountController.import(this.accessController.getPass(), wallet));
      return this.create(decryptProfile.data);
    }

    if (oldProfile.data.version < decryptProfile.data.version) {
      decryptProfile.wallets.map(wallet => this.accountController.import(this.accessController.getPass(), wallet));
      return this.update(oldProfile.data.id, decryptProfile.data);
    }

    return;
  }
}
