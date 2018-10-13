import * as CONST from 'constants/storage';
import storage from 'libs/Storage';
// import { hidePass } from 'libs/cipher';

/**
 * Provide all query to read or write in storage
 */
export const StorageService = {

  /**
   * Profiles and Wallets
   */
  Entities: {
    get: id => storage.get(id),
    set: (key, entity) => storage.set(key, entity),
    remove: key => storage.remove(key)
  },

  Pass: {
    get: () => storage.get(CONST.PASS),
    set: pass => storage.set(CONST.PASS, pass),
    check: pass => {
      return StorageService.Pass.get().then(savedPassHash => pass === savedPassHash);
    }
  },

  ProfileList: {
    get: () => storage.get(CONST.PROFILES),
    set: list => storage.set(CONST.PROFILES, list)
  },

  Settings: {
    get: () => storage.get(CONST.SETTINGS),
    set:  nextSettings => storage.set(CONST.SETTINGS, nextSettings)
  }
}