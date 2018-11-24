import { hashSync, compareSync } from 'bcryptjs';
import aes256 from 'aes256';

export const encode = (key: string, text: string): string => aes256.encrypt(key, text);
export const decode = (key: string, text: string): string => aes256.decrypt(key, text);

const SALT_ROUNDS = 12;
export const hashPass = pass => hashSync(pass, SALT_ROUNDS);
export const checkPass = (pass, hashedPass): boolean => compareSync(pass, hashedPass);
