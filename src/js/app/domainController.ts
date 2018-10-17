import EventEmitter = require('events');
import {StorageService } from 'services/StorageService';

interface IDomainData {
  [K: string]: string[];
}

/*
 * Filter phishing sites and manage domains 
 */
export class DomainController extends EventEmitter {
  public data: IDomainData;

  constructor () {
    super();
    this.load();
  }

  public checkDomain (domain: string): Promise<boolean> {
    console.log(domain);

    return Promise.resolve(true);
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
