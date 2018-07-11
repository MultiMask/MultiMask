import config from '../config';
import storage from '../models/storage';

export const getPass = () => storage.get(config.passKey);
export const setPass = pass => storage.set(config.passKey, pass);

export const checkPass = pass => {
  return getPass().then(savedPassHash => pass === savedPassHash);
};

export const getProfiles = () => storage.get(config.profiles);
export const setProfiles = list => storage.set(config.profiles, list);

export const getEntity = id => storage.get(id);
export const setEntity = (key, entity) => storage.set(key, entity);
export const removeEntity = key => storage.remove(key);

export const getAccountList = () => storage.get(config.accList);
export const setAccountList = list => storage.set(config.accList, list);

const withPrefix = walletName => `${config.walletPrefix}${walletName}`;
export const getWallet = walletName => storage.get(withPrefix(walletName));
export const setWallet = (walletName, wallet) => storage.set(withPrefix(walletName), wallet);
