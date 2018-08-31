import { encode } from '../../libs/cipher';
import AccountFactory from './accountFactory';

import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import { info } from 'loglevel';

export class AccountController {
  public accounts = [];

  private accessController: AccessController;
  private messageController: MessageController;

  constructor(opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
  }

  restore(accounts, pass) {
    info('AccountController > load all accounts > ', accounts);

    if (accounts && accounts.length > 0) {
      return this.loadAccountsByIds(pass, accounts).then(accounts => {
        accounts.forEach(this.addAccountInstance);

        return this.accounts;
      });
    } else {
      return Promise.resolve([]);
    }
  }

  getAccountsSerialized(accounts, pass) {
    return this.loadAccountsByIds(pass, accounts).then(result => {
      return result.map((account: any) => account.serialize());
    });
  }

  addAccountInstance = account => {
    if (!this.getAccountById(account.id)) {
      this.accounts.push(account);
    }
  };

  import = (pass, accountRaw) => {
    if (!this.getAccountById(accountRaw.id)) {
      const accountModel = AccountFactory.create(accountRaw);

      AccountFactory.save(pass, accountModel);
      this.addAccountInstance(accountModel);
    }
  };

  getAccountById(id) {
    return this.accounts.find(account => account.id === id);
  }

  getAccounts() {
    if (this.accessController.isAuth()) {
      return this.accounts;
    }

    return [];
  }

  /**
   * Return seed for account by id
   * @param id 
   */
  public getSeed(id): string {
    if (this.accessController.isAuth()) {
      const account = this.getAccountById(id);

      if (account) {
        const seed = account.getSeed();

        return encode(this.accessController.getPass(), seed);
      }
    }

    return null;
  }

  loadAccountsByIds(pass, ids) {
    return AccountFactory.loadListByIds(pass, ids);
  }

  clearList() {
    this.accounts = [];
  }
}
