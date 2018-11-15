import { info } from 'loglevel';

import { BusController } from 'app/busController';
import { KeyController } from 'app/keyController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { AccountController } from 'app/account/accountController';

import { Profile } from 'models/Profile';
import { StorageService } from 'services/StorageService';

import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED, ACCOUNT_NETWORK_UPDATE, ACCOUNT_IMPORT } from 'constants/account';

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
    // this.messageController.on(ACCOUNT_GETSEED, this.getSeed);
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
   * Update accounts and keys
   */
  private updateKeysAndAccounts () {
    const profileData = this.profile.getKeysAndAccounts();
    
    this.keyController.assignKeys( profileData.keys );
    this.accountController.assignAccounts( profileData.accounts );
  }

  /**
   * Get profiles list and restore first or create new
   */
  // private init () {
    // return this.profileListController.init()
    //   .then(this.restoreProfile);
  // }

  /**
   * Restore all accounts from store
   * @param accountIds
   */
  // private restoreAccounts = (accountIds: string[]) => {
  //   this.accountController.clearList();
  //   return this.accountController.restore(accountIds, this.getPass());
  // }
  
  /**
   * Return seed for Wallet to export
   * @param sendResponse 
   * @param id 
   */
  // public getSeed = (sendResponse, id): void => {
  //   sendResponse(this.accountController.getSeed(id));
  // }
}
