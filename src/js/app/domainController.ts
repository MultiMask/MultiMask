import EventEmitter = require('events');
import { StorageService } from 'services/StorageService';

import Account from 'app/account';
import { BusController } from 'app/busController';
import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { DomainAccess } from 'models/DomainAccess';
import { DOMAIN } from 'constants/promptTypes';
import { GET_ACCOUNTS, SET_CURRENT_DOMAIN } from 'constants/appInternal';
import { SETTING_OPEN_DOMAINS } from 'constants/settings';

/*
 * Filter phishing sites and manage domains 
 */
export class DomainController extends EventEmitter {
  private busController: BusController;

  private domain: string;
  public domainAccess: DomainAccess;

  constructor(opts) {
    super();

    this.busController = opts.busController;

    this.load();
    this.listening();
  }

  private listening = () => {
    this.busController.on(SET_CURRENT_DOMAIN, this.setCurrentDomain);
    this.busController.on(SETTING_OPEN_DOMAINS, this.changePermissionsToDomain);
  };

  /**
   * Return current domain
   */
  public getCurrentDomain() {
    return this.domain;
  }

  /**
   * Save current domain
   */
  private setCurrentDomain = (domain: string) => {
    this.domain = domain;
  };

  /**
   * Check permissions for domain
   * of show prompt to allow/deny
   * @param domain
   */
  public checkDomain(domain: string): Promise<boolean | string[]> {
    const isExist = this.domainAccess.isAllowedDomain(domain);
    if (isExist !== undefined) {
      return Promise.resolve(isExist);
    }

    return this.changePermissionsToDomain(domain);
  }

  /**
   * Open Prompt to change permissions to domain
   */
  public changePermissionsToDomain = (domain: string): Promise<boolean | string[]> => {
    return new Promise((res, rej) => {
      this.busController.emit(GET_ACCOUNTS, (accounts: Account[]) => {
        Promise.all(accounts.map(acc => acc.getInfo())).then(accInfo => {
          // remove unnecessary tx info
          accInfo.forEach(item => delete item.info.txs);

          const responder = approval => {
            // Check that user close or deny prompt
            if (!approval || (approval && approval.type === 'error')) {
              rej(approval);
              // when user approved domain
            } else {
              this.add(domain, approval);
              this.save();
              res(approval);
            }
          };

          NotificationService.open(
            new Prompt(DOMAIN, {
              data: {
                accounts: accInfo,
                permissions: this.domainAccess.getAllowedAccounts(domain)
              },
              domain,
              responder
            })
          );
        });
      });
    });
  };

  private add = (domain: string, data: IDomainAccount) => {
    this.domainAccess.add(domain, data);
    this.save();
  };

  /**
   * Load data from storage
   */
  private load() {
    return StorageService.Domains.get().then(data => (this.domainAccess = new DomainAccess(data)));
  }

  /**
   * Save current data to storage
   * @param data
   */
  private save() {
    return StorageService.Domains.set(this.domainAccess.toJSON());
  }
}
