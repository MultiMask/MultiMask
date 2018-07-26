import aes256 from 'aes256';

class BlockCipher {
  constructor(type) {
    this.type = type;
    this.ciphers = {
      aes256
    };
    this.sign = 'MM';
  }

  encrypt(key, profile, full = false) {
    try {
      // encryptEntities setting in config.json
      // eslint-disable-next-line
      if (encryptEntities) return JSON.stringify(data);

      const iv = `${this.sign}:${full ? profile.data.version : profile.version}:${this.type}:`;
      const stringifyData = JSON.stringify(profile);
      const cipher = this.ciphers[this.type];
      const encrypted = `${iv}${cipher.encrypt(key, stringifyData)}`;

      return encrypted;
    } catch (exception) {
      throw new Error(exception);
    }
  }

  decrypt(key, data) {
    try {
      // eslint-disable-next-line
      if (encryptEntities) return JSON.parse(data);

      // [sign, version, decipherType, data ]
      let dataParts = data.split(':');

      if (dataParts[0] !== this.sign) throw new Error('Incorrect sign to Multimask File');

      const decipherType = dataParts[2];
      const decipher = this.ciphers[decipherType];

      const encryptedData = dataParts[3];
      const decrypted = decipher.decrypt(key, encryptedData);

      return JSON.parse(decrypted);
    } catch (exception) {
      console.log(exception);
      return false;
    }
  }
}

export const cipherTypes = {
  AES256: 'aes256'
};

export default BlockCipher;
