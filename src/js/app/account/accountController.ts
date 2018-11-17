import Account from './';
import { AccountFactory } from './accountFactory';

import { BusController } from 'app/busController';
import { MessageController } from 'app/messageController';
import { DomainController } from 'app/domainController';
import { KeyController } from 'app/keyController';
import { CacheController } from 'app/cacheController';

import { GET_ACCOUNTS } from 'constants/appInternal';
import { ACCOUNT_INFO, ACCOUNT_NETWORK_UPDATE, ACCOUNT_INFO_DOMAIN } from 'constants/account';

interface IGetAccountOptions {
  key?: string;
  address?: string;
}

interface IGetAccountsOptions {
  bc?: string;
  domain?: string;
}

export class AccountController {
  public accounts: Account[] = [];

  private busController: BusController;
  private messageController: MessageController;
  private domainController: DomainController;
  private keyController: KeyController;
  private cacheController: CacheController;

  constructor (opts) {
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
    this.messageController.on(ACCOUNT_INFO_DOMAIN, this.getDomainAccounts);
    this.messageController.on(ACCOUNT_NETWORK_UPDATE, this.responseChangeNetwork);
  }

  /**
   * Return accountInfo
   */
  private responseAccountInfo = (sendResponse: InternalResponseFn) => {
    Promise.all(this.accounts.map(acc => acc.getInfo())).then(accountsInfo => {
      sendResponse({
        success: true,
        payload: {
          accounts: accountsInfo
        }
      });
    });
  };

  public getDomainAccounts = (sendResponse: InternalResponseFn, req, { domain }) => {
    const accounts = this.getAccounts({ domain });

    Promise.all(accounts.map(acc => acc.getInfo())).then(accountsInfo => {
      sendResponse({
        success: true,
        payload: {
          accounts: accountsInfo
        }
      });
    });
  };
  /**
   * Update account's wallet network
   */
  private responseChangeNetwork = (sendResponse: InternalResponseFn, { address, network }): void => {
    const account = this.getAccount({ address });

    account.changeNetwork(network, this.keyController.derivePrivateKey(account));
    this.cacheController.set(`wallet.${account.key}.network`, network);

    sendResponse({
      success: true
    });
  };

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
    if (opts && opts.key) {
      const found = this.accounts.find(acc => acc.key === opts.key);

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
      list = list.filter(acc => acc.bc === opts.bc);
    }

    if (opts && opts.domain) {
      list = list.filter(acc => this.domainController.domainAccess.isAllowedAccount(opts.domain, acc.key));
    }

    return list;
  }

  /**
   * Clear all account instances
   */
  public clearList (): void {
    this.accounts = [];
  }
}
