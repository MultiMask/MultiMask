import EventEmitter = require('events');
import { StorageService } from 'services/StorageService';

import Account from 'app/account';
import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { DOMAIN } from 'constants/promptTypes';
import { GET_ACCOUNTS } from 'constants/appInternal'
import { BusController } from 'app/busController';

interface IDomainData {
  [K: string]: string[];
}

/*
 * Filter phishing sites and manage domains 
 */
export class DomainController extends EventEmitter {
  private busController: BusController;
  
  public data: IDomainData;

  constructor (opts) {
    super();

    this.busController = opts.busController;
    this.load();
  }

  public checkDomain (domain: string): Promise<boolean> {
    const isExist = this.checkExist(domain);
    if (isExist) {
      return Promise.resolve(isExist);
    }

    return new Promise((res, rej) => {
      this.busController.emit(GET_ACCOUNTS, (accounts: Account[]) => {
        Promise.all(accounts.map(acc => acc.getInfo()))
          .then(accInfo => {
            accInfo.forEach(item => delete item.info.txs);
            const responder = approval => {
              console.log(approval);
              res(approval);
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

  private checkExist (domain: string): boolean {
    return !!this.data[domain];
  }

  /**
   * Load data from storage
   */
  public load () {
    return StorageService.Domains.get().then(data => this.data = data || {});
  }

  /**
   * Save current data to storage
   * @param data 
   */
  public save (data: IDomainData) {
    return StorageService.Domains.set(data);
  }
}
