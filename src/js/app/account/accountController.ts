import { info } from 'loglevel';

import Account from './';
import { AccountFactory } from './accountFactory';

import { BusController } from 'app/busController';
import { AccessController } from 'app/accessController';
import { MessageController } from 'app/messageController';
import { DomainController} from 'app/domainController';
import { KeyController } from 'app/keyController';
import { CacheController } from 'app/cacheController';

import { GET_ACCOUNTS } from 'constants/appInternal';
import { ACCOUNT_INFO, ACCOUNT_CREATE, ACCOUNT_GETSEED, ACCOUNT_NETWORK_UPDATE } from 'constants/account';

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
  private keyController: KeyController;
  private cacheController: CacheController;

  constructor (opts) {
    this.accessController = opts.accessController;
    this.busController = opts.busController;
    this.messageController = opts.messageController;
    this.domainController = opts.domainController;
    this.keyController = opts.keyController;
    this.cacheController = opts.cacheController;

    this.listening();
  }

  /**
   * Listen internal bus
   */
  private listening () {
    this.busController.on(GET_ACCOUNTS, cb => cb(this.getAccounts()));

    this.messageController.on(ACCOUNT_INFO, this.responseAccountInfo);
    this.messageController.on(ACCOUNT_NETWORK_UPDATE, this.responseChangeNetwork);
  }

  /**
   * Return accountInfo
   */
  private responseAccountInfo = (sendResponse: InternalResponseFn) => {
    Promise.all(this.accounts.map(acc => acc.getInfo()))
      .then(accountsInfo => {
        sendResponse({
          success: true,
          payload: {
            accounts: accountsInfo
          }
        })
      })
  }

  /**
   * Update account's wallet network
   */
  private responseChangeNetwork = (sendResponse: InternalResponseFn, {address, network}): void => {
    const account = this.getAccount({ address });

    account.changeNetwork(network, this.keyController.derivePrivateKey(account));
    this.cacheController.set(`wallet.${account.key}.network`, network);

    sendResponse({
      success: true
    })
  }

  /**
   * Set new plenty of accounts
   * @param accounts 
   */
  public assignAccounts (accounts: IAccountKeyData[]) {
    this.accounts = accounts.map(accountLink => {
      const network = this.cacheController.get(`wallet.${accountLink.key}.network`);
      const accountInstane = AccountFactory.create({
        ...accountLink,
        network
      });

      accountInstane.init(this.keyController.derivePrivateKey(accountInstane));

      return accountInstane;
    });
  }

  /**
   * Get single account by filter
   */
  public getAccount (opts: IGetAccountOptions): Account {
    if (opts && opts.id) {
      const found = this.accounts.find(acc => acc.getAddress() === opts.id);

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

  /**
   * Get filtred accounts
   */
  public getAccounts (opts?: IGetAccountsOptions): Account[] {
    let list = this.accounts.slice();

    if (opts && opts.bc) {
      list = list.filter(acc => acc.bc  === opts.bc);
    }
    
    if (opts && opts.domain) {
      list = list.filter(acc => this.domainController.domainAccess.isAllowedAccount(opts.domain, '1'));
    }

    return list;
  }







  /**
   * Restore accounts by Ids from storage
   * @param accounts 
   * @param pass 
   */
  public restore (accounts, pass: string) {
    // info('AccountController > load all accounts > ', accounts);

    // if (accounts && accounts.length > 0) {
    //   return AccountFactory.loadListByIds(pass, accounts).then(accountsFull => {
    //     accountsFull.forEach(this.addAccountInstance);

    //     return this.accounts;
    //   });
    // } else {
    //   return Promise.resolve([]);
    // }
  }

  public addAccountInstance = account => {
    // if (!this.getAccount({ id: account.id })) {
    //   this.accounts.push(account);
    // }
  };

  public import = (pass, accountRaw) => {
    // if (!this.getAccount({ id: accountRaw.id })) {
    //   const accountModel = AccountFactory.create(accountRaw);

    //   AccountFactory.save(pass, accountModel);
    //   this.addAccountInstance(accountModel);
    // }
  };

  /**
   * Return seed for required account
   * @param id 
   */
  public getSeed (id: string): string {
    if (this.accessController.isAuth()) {
      const account = this.getAccount({ id });

      if (account) {
        // const seed = account.getSeed();

        // TODO: repair it
        // return encode(this.accessController.getPass(), seed);
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
