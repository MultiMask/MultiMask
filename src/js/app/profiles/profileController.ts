import { info } from 'loglevel';

import { BusController } from 'app/busController';
import { KeyController } from 'app/keyController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { AccountController } from 'app/account/accountController';

import { Profile } from 'models/Profile';
import { StorageService } from 'services/StorageService';

import { ACCOUNT_CREATE, ACCOUNT_IMPORT, ACCOUNT_UPDATE } from 'constants/account';

export class ProfileController {
  private profile: Profile;

  private accessController: AccessController;
  private busController: BusController;
  private messageController: MessageController;
  private keyController: KeyController;

  private accountController: AccountController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.busController = opts.busController;
    this.messageController = opts.messageController;
    this.keyController = opts.keyController;
    
    this.accountController = opts.accountController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening () {
    this.messageController.on(ACCOUNT_CREATE, this.responseAddAccount);
    this.messageController.on(ACCOUNT_IMPORT, this.responseImportAccount);

    this.busController.on(ACCOUNT_UPDATE, this.responseUpdateAccount);
  }

  /**
   * Create new account in with profile with data
   * @param sendResponse 
   * @param accountData 
   */
  private responseAddAccount = (sendResponse: InternalResponseFn, { payload: { bc }}) => {   
    this.profile.addWallet(bc);
    this.updateKeysAndAccounts();

    this.save(this.profile);

    sendResponse({
      success: true,
    });
  }

  /**
   * Import seed or PK 
   */
  private responseImportAccount = (sendResponse: InternalResponseFn, { payload: {bc, privateKey}}) => {
    this.profile.addWallet(bc, privateKey);
    
    this.updateKeysAndAccounts();
    this.save(this.profile);

    sendResponse({
      success: true,
    });
  }

  private responseUpdateAccount = (key: string, data, cb) => {
    this.profile.updateWallet(key, data);

    this.updateKeysAndAccounts();
    this.save(this.profile);

    if (cb) {
      cb();
    }
  }

  /**
   * Update accounts and keys
   */
  private updateKeysAndAccounts () {
    const profileData = this.profile.getKeysAndAccounts();
    
    this.keyController.assignKeys( profileData.keys );
    this.accountController.assignAccounts( profileData.accounts );
  }
      
  /**
   * Restore all accounts from Profile
   * @param {Profile} profile
   */
  public activateProfile = async (profileId: string) => {
    this.profile = Profile.fromJSON(await StorageService.Entities.get(profileId));
    this.profile.decode(this.accessController.decode);

    this.updateKeysAndAccounts();
    return this.profile.id;
  }

  /**
   * Save profile in storage
   * @param profile 
   */
  public save (profile: Profile) {
    const encodedProfile = profile.getEncodedData(this.accessController.encode);

    return StorageService.Entities.set(encodedProfile.id, encodedProfile);
  }

  /**
   * Updaate profile name in current instane and in storage
   * @param id 
   * @param name 
   */
  public updateName (id: string, name: string) {
    if (id === this.profile.id) {
      this.profile.name = name;
    }

    return StorageService.Entities.get(id)
      .then((profile) => {
        profile.name = name;
        
        return StorageService.Entities.set(id, profile);
      })
  }

  /**
   * Return encrypted profile
   * @param id 
   */
  public export (id: string): Promise<string> {
    return StorageService.Entities.get(id)
      .then(profileData => {
        const profile = Profile.fromJSON(profileData);
        profile.decode(this.accessController.decode);

        console.log('before send:', JSON.stringify(profile));

        return this.accessController.encode(JSON.stringify(profile));
      })
  }
}
