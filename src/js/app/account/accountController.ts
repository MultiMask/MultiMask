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

  /**
   * Restore accounts by Ids from storage
   * @param accounts 
   * @param pass 
   */
  public restore(accounts, pass) {
    info('AccountController > load all accounts > ', accounts);

    if (accounts && accounts.length > 0) {
      return AccountFactory.loadListByIds(pass, accounts).then(accounts => {
        accounts.forEach(this.addAccountInstance);

        return this.accounts;
      });
    } else {
      return Promise.resolve([]);
    }
  }

  public addAccountInstance = account => {
    if (!this.getAccountById(account.id)) {
      this.accounts.push(account);
    }
  };

  public import = (pass, accountRaw) => {
    if (!this.getAccountById(accountRaw.id)) {
      const accountModel = AccountFactory.create(accountRaw);

      AccountFactory.save(pass, accountModel);
      this.addAccountInstance(accountModel);
    }
  };

  public getAccountById(id) {
    return this.accounts.find(account => account.id === id);
  }

  public getAccounts() {
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

  public clearList() {
    this.accounts = [];
  }
}
