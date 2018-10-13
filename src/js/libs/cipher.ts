import {hashSync, compareSync} from 'bcrypt';
import sha256 from 'sha256';
import aes256 from 'aes256';

export const hash = str => sha256(str);
export const encode = (key, text) => aes256.encrypt(key, text);
export const decode = (key, text) => aes256.decrypt(key, text);

const SALT_ROUNDS = 12;
export const hashPass = pass => hashSync(pass, SALT_ROUNDS);
export const checkPass = (pass, hashedPass) => compareSync(pass, hashedPass);