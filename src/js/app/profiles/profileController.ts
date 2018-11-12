import { info } from 'loglevel';

import { BusController } from 'app/busController';
import { KeyController } from 'app/keyController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { ProfileListController } from 'app/profiles/profileListController';
import { AccountController } from 'app/account/accountController';
import AccountFactory from 'app/account/accountFactory';

import { Profile } from 'models/Profile';
import { StorageService } from 'services/StorageService';

import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED, ACCOUNT_NETWORK_UPDATE } from 'constants/account';
import { PROFILE_SELECT } from 'constants/profile';

export class ProfileController {
  private accessController: AccessController;
  private busController: BusController;
  private messageController: MessageController;
  private keyController: KeyController;

  private profileListController: ProfileListController;
  private accountController: AccountController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.busController = opts.busController;
    this.messageController = opts.messageController;
    this.keyController = opts.keyController;
    
    this.accountController = opts.accountController;
    this.profileListController =  opts.profileListController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening () {
    this.busController.on(PROFILE_SELECT, this.activateProfile);

    // this.messageController.on(ACCOUNT_INFO, this.getAccounts);
    // this.messageController.on(ACCOUNT_CREATE, this.addAccount);
    // this.messageController.on(ACCOUNT_GETSEED, this.getSeed);
    // this.messageController.on(ACCOUNT_NETWORK_UPDATE, this.updateAccountNetwork);
  }
    
  /**
   * Restore all accounts from Profile
   * @param {Profile} profile
   */
  private activateProfile = async (profileId: string, cb) => {
    const profile = Profile.fromJSON(await StorageService.Entities.get(profileId));
    const profileData = profile.getKeysAndAccounts(this.accessController.decode);

    this.keyController.assignKeys( profileData.keys );
    this.accountController.assignAccounts( profileData.accounts );

    cb(true);
    // info('Profile changed > ', profile);
    // return this.restoreAccounts(profile.getAccounts());
    // // return this.restoreAccounts([profile.getAccounts());
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
   * Create new account in with profile with data
   * @param sendResponse 
   * @param accountData 
   */
  // public addAccount = (sendResponse, accountData): Promise<void> => {   
  //   const profile = this.profileListController.getCurrent();
  //   let account = null;

  //   return AccountFactory.create(accountData)
  //     .init()
  //     .then(createdAccount => {
  //       account = createdAccount;

  //       return profile.addAccount(this.getPass(), account)
  //     })
  //     .then(() => {
  //       AccountFactory.save(this.getPass(), account);
  //       this.accountController.addAccountInstance(account);
  
  //       this.getAccounts(sendResponse);
  //     })
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
