import config from '../config';
import storage from '../models/storage';
import cipher from '../libs/cipher';

export const getPass = () => storage.get(config.passKey);
export const setPass = passHash => storage.set(config.passKey, passHash);
