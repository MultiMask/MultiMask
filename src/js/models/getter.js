import config from '../config';
import storage from '../models/storage';
import {hash} from '../libs/cipher';

export const getPass = () => storage.get(config.passKey);
export const setPass = passHash => storage.set(config.passKey, passHash);

export const getAccountList = () => storage.get(config.accList);
export const setAccountList = list => storage.set(config.accList, list);