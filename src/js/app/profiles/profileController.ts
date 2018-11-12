import { info } from 'loglevel';

import { BusController } from 'app/busController';
import { KeyController } from 'app/keyController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { AccountController } from 'app/account/accountController';

import { Profile } from 'models/Profile';
import { StorageService } from 'services/StorageService';

import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED, ACCOUNT_NETWORK_UPDATE } from 'constants/account';
import { PROFILE_SELECT } from 'constants/profile';

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
    // this.messageController.on(ACCOUNT_INFO, this.getAccounts);
    // this.messageController.on(ACCOUNT_GETSEED, this.getSeed);
    // this.messageController.on(ACCOUNT_NETWORK_UPDATE, this.updateAccountNetwork);
  }

  /**
   * Create new account in with profile with data
   * @param sendResponse 
   * @param accountData 
   */
  public responseAddAccount = async (sendResponse: InternalResponseFn, { payload: { bc }}) => {   
    this.profile.addWallet(bc);
    await this.save(this.profile);

    sendResponse({
      success: true,
    });
    // const profile = this.profileListController.getCurrent();
    // let account = null;

    // return AccountFactory.create(accountData)
    //   .init()
    //   .then(createdAccount => {
    //     account = createdAccount;

    //     return profile.addAccount(this.getPass(), account)
    //   })
    //   .then(() => {
    //     AccountFactory.save(this.getPass(), account);
    //     this.accountController.addAccountInstance(account);
  
    //     this.getAccounts(sendResponse);
    //   })
  }
      
  /**
   * Restore all accounts from Profile
   * @param {Profile} profile
   */
  public activateProfile = async (profileId: string) => {
    this.profile = Profile.fromJSON(await StorageService.Entities.get(profileId));
    const profileData = this.profile.getKeysAndAccounts(this.accessController.decode);

    this.keyController.assignKeys( profileData.keys );
    this.accountController.assignAccounts( profileData.accounts );

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

  // private getPass () {
  //   // return this.accessController.getPass();
  // }

  /**
   * DEPRICATED
   * Return accounts for current Profile
   * @param sendResponse
   */
  public getAccounts = (sendResponse): void => {
    // const resolver = this.profileListController.getCurrent()
    //   ? Promise.resolve(this.accountController.getAccounts())
    //   : this.init();

    // resolver
    //   .then(accounts => {
    //     return Promise.all(accounts.map(account => account.getInfo()));
    //   })
    //   .then(sendResponse);
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
   * Update account's wallet network
	 * @param sendResponse
   * @param accountData
   */
  // public updateAccountNetwork = (sendResponse, accountData: {id: string, network: string}): void => {
  //   const account = this.accountController.getAccount({ id: accountData.id });
  //   account.changeNetwork(accountData.network)

  //   AccountFactory.save(this.getPass(), account)

  //   this.getAccounts(sendResponse);
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
