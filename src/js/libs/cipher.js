import sha256 from 'sha256';
import aes256 from 'aes256';

export const hash = str => sha256(str);
export const encode = (key, text) => aes256.encrypt(key, text);
export const decode = (key, text) => aes256.decrypt(key, text);

const salt = 'multimask';
const withSalt = pass => `${salt}${pass}`;
export const hidePass = pass => hash(withSalt(pass)); 