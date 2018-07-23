import aes256 from 'aes256';

class BlockCipher {
  constructor(type) {
    this.type = type;
    this.ciphers = {
      aes256
    };
    this.sign = 'MM';
  }

  encrypt(key, data) {
    try {
      // encryptEntities setting in config.json
      // eslint-disable-next-line
      if (encryptEntities) return JSON.stringify(data);
      const stringifyData = JSON.stringify(data);
      const cipher = this.ciphers[this.type];
      const encrypted = cipher.encrypt(key, stringifyData);

      return encrypted;
    } catch (exception) {
      throw new Error(exception);
    }
  }

  decrypt(key, data) {
    try {
      // eslint-disable-next-line
      if (encryptEntities) return JSON.parse(data);

      const decipher = this.ciphers[this.type];
      var decrypted = decipher.decode(key, data);
      return JSON.parse(decrypted);
    } catch (exception) {
      throw new Error(exception);
    }
  }
}

export const cipherTypes = {
  AES256: 'aes256'
};

export default BlockCipher;
