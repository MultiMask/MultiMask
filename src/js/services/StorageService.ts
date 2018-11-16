import * as CONST from 'constants/storage';
import storage from 'libs/Storage';
import { hashPass, checkPass } from 'libs/cipher';

/**
 * Provide all query to read or write in storage
 */
export const StorageService = {

  /**
   * Profiles and Wallets
   */
  Entities: {
    get: (id: string) => storage.get(id),
    set: (key: string, entity: any) => storage.set(key, entity),
    remove: (key: string) => storage.remove(key)
  },

  Pass: {
    get: () => storage.get(CONST.PASS),
    set: (pass: string) => storage.set(CONST.PASS, hashPass(pass)),
    check: (pass: string) => StorageService.Pass.get().then(savedPassHash => checkPass(pass, savedPassHash))
  },

  ProfileList: {
    get: () => storage.get(CONST.PROFILES),
    set: (list: string[]) => storage.set(CONST.PROFILES, list),
    getCurrent: () => storage.get(CONST.PROFILE_CURRENT),
    setCurrnet: (current: string) => storage.set(CONST.PROFILE_CURRENT, current),
  },

  Settings: {
    get: () => storage.get(CONST.SETTINGS),
    set: nextSettings => storage.set(CONST.SETTINGS, nextSettings)
  },

  Domains: {
    get: () => storage.get(CONST.DOMAINS),
    set: domains => storage.set(CONST.DOMAINS, domains)
  },

  PopupState: {
    get: () => storage.get(CONST.POPUP_STATE),
    set: state => storage.set(CONST.POPUP_STATE, state)
  },

  Cache: {
    get: () => storage.get(CONST.CACHE),
    set: state => storage.set(CONST.CACHE, state)
  }
}
