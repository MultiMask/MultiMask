import { get, set } from 'lodash';
import { StorageService } from 'services/StorageService';

export class CacheController {
  private data: any;

  public init () {
    return StorageService.Cache.get()
      .then(payload => {
        this.data = payload || {};
      })
  }

  public get = (path:string): any => {
    return get(this.data, path, null);
  }

  public set = (path:string, value: any) => {
    set(this.data, path, value);
    return StorageService.Cache.set(this.data);
  }
}
