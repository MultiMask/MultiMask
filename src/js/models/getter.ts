import config from '../config';
import storage from './storage';

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

export const getSettings = () => storage.get(config.settings);
export const setSettings = nextSettings => storage.set(config.settings, nextSettings);
