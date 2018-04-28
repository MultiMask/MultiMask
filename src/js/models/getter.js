import config from '../config';
import storage from '../models/storage';
import {hash} from '../libs/cipher';

export const getPass = () => storage.get(config.passKey);
export const setPass = passHash => storage.set(config.passKey, passHash);
// export const checkPass = pass => {
//     return new Promise(res => {
//         getPass.then( passHass => {
//             res(pass === passHass);
//         })
//     })
// }
