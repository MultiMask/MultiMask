import { encode } from '../../libs/cipher';
import AccountFactory from './accountFactory';

import Account from './';
import { AccessController } from './../accessController';
import { MessageController } from './../messageController';

import { info } from 'loglevel';

export class AccountController {
  public accounts: Account[] = [];

  private accessController: AccessController;
  private messageController: MessageController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.messageController = opts.messageController;
  }

  /**
   * Restore accounts by Ids from storage
   * @param accounts 
   * @param pass 
   */
  public restore (accounts, pass) {
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
    if (!this.getById(account.id)) {
      this.accounts.push(account);
    }
  };

  public import = (pass, accountRaw) => {
    if (!this.getById(accountRaw.id)) {
      const accountModel = AccountFactory.create(accountRaw);

      AccountFactory.save(pass, accountModel);
      this.addAccountInstance(accountModel);
    }
  };

  /**
   * Find required account by ID
   * @param id 
   */
  public getById (id): Account {
    return this.accounts.find(account => account.id === id);
  }

  /**
   * Find required account by address
   * @param address 
   */
  public getByAddress (address: string): Account {
    return this.accounts.find(account => account.getAddress() === address);
  }

  /**
   * Return all accounts
   */
  public getAccounts (): Account[] {
    if (this.accessController.isAuth()) {
      return this.accounts;
    }

    return [];
  }

  /**
   * Return all accounts
   */
  public getAccountsBySign (sign: string): Account[] {
    if (this.accessController.isAuth()) {
      return this.accounts.filter(acc => acc.blockchain === sign);
    }

    return [];
  }

  /**
   * Return seed for required account
   * @param id 
   */
  public getSeed (id: string): string {
    if (this.accessController.isAuth()) {
      const account = this.getById(id);

      if (account) {
        const seed = account.getSeed();

        return encode(this.accessController.getPass(), seed);
      }
    }

    return null;
  }

  /**
   * Clear all account instances
   */
  public clearList (): void {
    this.accounts = [];
  }
}
