import EventEmitter = require('events');
import { StorageService } from 'services/StorageService';

import Account from 'app/account';
import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { DomainAccess } from 'models/DomainAccess';
import { DOMAIN } from 'constants/promptTypes';
import { GET_ACCOUNTS, SET_CURRENT_DOMAIN } from 'constants/appInternal'
import { BusController } from 'app/busController';
import { isNull } from 'util';

/*
 * Filter phishing sites and manage domains 
 */
export class DomainController extends EventEmitter {
  private busController: BusController;
  
  private domain: string;
  public domainAccess: DomainAccess;

  constructor (opts) {
    super();

    this.busController = opts.busController;
    
    this.load();
    this.listening();
  }

  private listening = () => {
    this.busController.on(SET_CURRENT_DOMAIN, this.setCurrentDomain)
  }

  private setCurrentDomain = (domain: string) => {
    this.domain = domain;
  }

  /**
   * Check permissions for domain
   * of show prompt to allow/deny
   * @param domain 
   */
  public checkDomain (domain: string): Promise<boolean> {
    const isExist = this.domainAccess.isAllowedDomain(domain);
    if (isExist !== undefined) {
      return Promise.resolve(isExist);
    }

    return new Promise((res, rej) => {
      this.busController.emit(GET_ACCOUNTS, (accounts: Account[]) => {
        Promise.all(accounts.map(acc => acc.getInfo()))
          .then(accInfo => {
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
            }
      
            NotificationService.open(new Prompt(DOMAIN, { 
              data: accInfo,
              domain,
              responder
            }))
          })
      })
    })
  }

  private add = (domain: string, data: IDomainAccount) => {
    this.domainAccess.add(domain, data);
    this.save();
  }

  /**
   * return current domain
   */
  public getCurrentDomain () {
    return this.domain;
  }

  /**
   * Load data from storage
   */
  private load () {
    return StorageService.Domains.get().then(data => this.domainAccess = new DomainAccess(data));
  }

  /**
   * Save current data to storage
   * @param data 
   */
  private save () {
    return StorageService.Domains.set(this.domainAccess.toJSON());
  }
}
