import EventEmitter = require('events');
import { StorageService } from 'services/StorageService';

import { NotificationService } from 'services/NotificationService';
import { Prompt } from 'models/Prompt';
import { DOMAIN } from 'constants/promptTypes';
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
      const responder = approval => {
        res(approval);
      }

      NotificationService.open(new Prompt(DOMAIN, { responder }))
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
