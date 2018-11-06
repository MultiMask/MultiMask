import { encode } from '../../libs/cipher';
import AccountFactory from './accountFactory';

import Account from './';
import { BusController } from 'app/busController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { DomainController} from 'app/domainController';
import { GET_ACCOUNTS } from 'constants/appInternal';

import { info } from 'loglevel';

interface IGetAccountOptions {
  id?: string;
  address?: string;
}

interface IGetAccountsOptions {
  bc?: string;
  domain?: string;
}

export class AccountController {
  public accounts: Account[] = [];

  private accessController: AccessController;
  private busController: BusController;
  private messageController: MessageController;
  private domainController: DomainController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.busController = opts.busController;
    this.messageController = opts.messageController;
    this.domainController = opts.domainController;

    this.listening();
  }

  /**
   * Listen internal bus
   */
  private listening () {
    this.busController.on(GET_ACCOUNTS, cb => cb(this.getAccounts()));
  }

  /**
   * Restore accounts by Ids from storage
   * @param accounts 
   * @param pass 
   */
  public restore (accounts, pass: string) {
    info('AccountController > load all accounts > ', accounts);

    if (accounts && accounts.length > 0) {
      return AccountFactory.loadListByIds(pass, accounts).then(accountsFull => {
        accountsFull.forEach(this.addAccountInstance);

        return this.accounts;
      });
    } else {
      return Promise.resolve([]);
    }
  }

  public addAccountInstance = account => {
    if (!this.getAccount({ id: account.id })) {
      this.accounts.push(account);
    }
  };

  public import = (pass, accountRaw) => {
    if (!this.getAccount({ id: accountRaw.id })) {
      const accountModel = AccountFactory.create(accountRaw);

      AccountFactory.save(pass, accountModel);
      this.addAccountInstance(accountModel);
    }
  };

  /**
   * Get single account by filter
   */
  public getAccount (opts: IGetAccountOptions): Account {
    if (this.accessController.isAuth()) {
      if (opts && opts.id) {
        const found = this.accounts.find(acc => acc.id === opts.id);

        if (found) {
          return found;
        }
      }
      
      if (opts && opts.address) {
        const found = this.accounts.find(acc => acc.getAddress() === opts.address);

        if (found) {
          return found;
        }
      }

      return undefined;
    }

    throw new Error('User not Authorized');
  }

  /**
   * Get filtred accounts
   */
  public getAccounts (opts?: IGetAccountsOptions): Account[] {
    if (this.accessController.isAuth()) {
      let list = this.accounts.slice();

      if (opts && opts.bc) {
        list = list.filter(acc => acc.blockchain  === opts.bc);
      }
      
      if (opts && opts.domain) {
        list = list.filter(acc => this.domainController.domainAccess.isAllowedAccount(opts.domain, acc.id));
      }

      return list;
    }

    throw new Error('User not Authorized');
  }

  /**
   * Return seed for required account
   * @param id 
   */
  public getSeed (id: string): string {
    if (this.accessController.isAuth()) {
      const account = this.getAccount({ id });

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
