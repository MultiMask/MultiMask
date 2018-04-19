import sha256 from 'sha256';

export const hash = str => sha256(str);
