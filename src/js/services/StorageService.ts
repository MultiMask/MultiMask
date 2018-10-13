import * as CONST from 'constants/storage';
import storage from 'libs/Storage';
import { hashPass } from 'libs/cipher';

/**
 * Provide all query to read or write in storage
 */
export const StorageService = {

  /**
   * Profiles and Wallets
   */
  Entities: {
    get: (id: string) => storage.get(id),
    set: (key: string, entity: string) => storage.set(key, entity),
    remove: (key: string) => storage.remove(key)
  },

  Pass: {
    get: () => storage.get(CONST.PASS),
    set: (pass: string) => storage.set(CONST.PASS, hashPass(pass)),
    check: (pass: string) => {
      return StorageService.Pass.get().then(savedPassHash => hashPass(pass) === savedPassHash);
    }
  },

  ProfileList: {
    get: () => storage.get(CONST.PROFILES),
    set: (list: string[]) => storage.set(CONST.PROFILES, list)
  },

  Settings: {
    get: () => storage.get(CONST.SETTINGS),
    set: nextSettings => storage.set(CONST.SETTINGS, nextSettings)
  }
}