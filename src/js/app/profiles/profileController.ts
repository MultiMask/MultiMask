import { ProfileListController } from './profileListController';
import ProfileFactory from './profileFactory';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import {AccountController} from './../account/accountController';
import AccountFactory from './../account/accountFactory';
import { Profile } from './Profile';

import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED } from './../../constants/account';

export class ProfileController {
  private accessController: AccessController;
  private messageController: MessageController;

  private profileListController: ProfileListController;
  private accountController: AccountController;

  private currentProfileId = null;

  constructor(opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
    
    this.accountController = opts.accountController;
    this.profileListController =  opts.profileListController;

    this.startListening();
  }

  /**
   * Messages
   */
  private startListening() {
    this.messageController.on(ACCOUNT_INFO, this.getAccounts);
    this.messageController.on(ACCOUNT_CREATE, this.addAccount);
    this.messageController.on(ACCOUNT_GETSEED, this.getSeed);
  }

  private getPass() {
    return this.accessController.getPass();
  }

  /**
   * Return accounts for current Profile
   * @param sendResponse
   */
  public getAccounts = (sendResponse): void => {
    const resolver = this.currentProfileId
      ? Promise.resolve(this.accountController.getAccounts())
      : this.init();

    resolver
      .then(accounts => {
        return Promise.all(accounts.map(account => account.getInfo()));
      })
      .then(sendResponse);
  }

  /**
   * Get profiles list and restore first or create new
   */
  private init() {
    return this.profileListController.init()
      .then((profile: Profile) => {
        return profile.getAccounts();
      })
      .then(this.restoreAccounts);
  }

  /**
   * Restore all accounts from store
   * @param accountIds
   */
  private restoreAccounts = (accountIds: string[]) => {
    this.accountController.clearList();
    return this.accountController.restore(accountIds, this.getPass());
  }
  /**
   * Create new default profile
   */
  // private createDefault() {
  //   const profile = ProfileFactory.createDefault();

  //   ProfileFactory.create(this.getPass(), profile);
  //   this.profileListController.add(profile);

  //   return this.setCurrrent(profile);
  // }

  /**
   * Set new current account and decode all wallets in this profile
   * @param profile 
   */
  // private setCurrrent(profile) {
  //   this.currentProfileId = profile.getId();

  //   this.accountController.clearList();
  //   return this.accountController.restore(profile.getAccounts(), this.getPass());
  // }

  /**
   * Create new account in with profile with data
   * @param sendResponse 
   * @param accountData 
   */
  public addAccount = (sendResponse, accountData): void => {   
    const profile = this.getCurrent();
    const account = AccountFactory.create(accountData);

    profile.addAccount(this.getPass(), account).then(() => {
      AccountFactory.save(this.getPass(), account);
      this.accountController.addAccountInstance(account);

      this.getAccounts(sendResponse);
    });
  }

  /**
   * Return seed for Wallet to export
   * @param sendResponse 
   * @param id 
   */
  public getSeed = (sendResponse, id): void => {
    sendResponse(this.accountController.getSeed(id));
  }

  getCurrent() {
    return this.profileListController.findById(this.currentProfileId);
  }

  async getFullInfo(id) {
    const profile = this.profileListController.findById(id);

    if (profile) {
      return this.accountController.getAccountsSerialized(profile.getAccounts(), this.getPass()).then(accounts => {
        profile.wallets = accounts;

        return profile;
      });
    } else {
      return Promise.resolve();
    }
  }


  ////////// LIST
  // create(data) {
  //   const profile = new Profile(data);

  //   ProfileFactory.create(this.getPass(), profile);
  //   this.profileListController.add(profile);
  // }

  // remove(id) {
  //   if (id !== this.currentProfileId) {
  //     this.profileListController.remove(id);
  //   }
  // }

  // export(id) {
  //   return this.getFullInfo(id).then(profile => {
  //     return ProfileFactory.encryptFullProfile(this.getPass(), profile, true);
  //   });
  // }

  // update(id, data) {
  //   this.profileListController.update(this.getPass(), id, data);
  // }

  // import(pass, encryptedProfile) {
  //   const decryptProfile = ProfileFactory.decryptFullProfile(pass, encryptedProfile);

  //   if (!decryptProfile) return;

  //   const oldProfile = this.profileListController.findById(decryptProfile.data.id);

  //   if (!oldProfile) {
  //     decryptProfile.wallets.map(wallet => this.accountController.import(this.getPass(), wallet));
  //     return this.create(decryptProfile.data);
  //   }

  //   if (oldProfile.data.version < decryptProfile.data.version) {
  //     decryptProfile.wallets.map(wallet => this.accountController.import(this.getPass(), wallet));
  //     return this.update(oldProfile.data.id, decryptProfile.data);
  //   }

  //   return;
  // }

  // select(id) {
  //   const selectedProfile = this.profileListController.findById(id);
  //   this.setCurrrent(selectedProfile);
  // }

  // getData() {
  //   const profileList = this.profileListController.getList();
  //   return { list: profileList, profileId: this.currentProfileId };
  // }
}
