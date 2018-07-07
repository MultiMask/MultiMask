import config from '../config';
import storage from '../models/storage';
import { hidePass } from '../libs/cipher';

export const getPass = () => storage.get(config.passKey);
export const setPass = pass => storage.set(config.passKey, pass);

export const checkPass = pass => {
    return getPass().then(savedPassHash => {
        return pass === savedPassHash;
    });
}

export const getAccountList = () => storage.get(config.accList);
export const setAccountList = list => storage.set(config.accList, list);

const getWalletName = walletName => `${config.walletPrefix}${walletName}`;
export const getWallet = walletName => storage.get(getWalletName(walletName));
export const setWallet = (walletName, wallet) => storage.set(getWalletName(walletName), wallet);
