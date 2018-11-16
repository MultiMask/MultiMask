import bitcoin from 'bitcoinjs-lib/';
import hdkey from 'hdkey';
import * as bip39 from 'bip39';

import Account from 'app/account';
import { BCList } from 'bcnetwork';
import { isSeed } from 'helpers/checkers';
import { getParams, generateId } from 'helpers/profiles';
import { stringToHex } from 'helpers/func';

console.log(bitcoin);

/**
 * Store HD key in memory and devire key for wallets
 */
export class KeyController {
  private keys: IKeyStore = null;
  private seed: Record<string, hdkey> = {};
  private root: any;
  
  /**
   * Generate key by seed phase or private key
   * @param mnemonic 
   * @param bc 
   */
  public static generateKeyFromSeedOrPK (mnemonic: string, bc: string): Buffer | string {
    if (isSeed(mnemonic)) {
      const bp44number = BCList[bc];
      const seed = bip39.mnemonicToSeed(mnemonic);
      const root = hdkey.fromMasterSeed(seed);
      const path = `m/44'/${bp44number}/0'/0/0`;

      return root.derive(path).privateKey;
    } else {
      return mnemonic;
    }
  }

  /**
   * Assign plenty of keys to generate PK
   * @param keys 
   */
  public assignKeys (keys: IKeyStore): void {
    this.keys = keys;

    const mnemonic = this.keys.master;
    console.log('mnemonic', mnemonic);

    const seed = bip39.mnemonicToSeed(mnemonic);
    console.log('seed39', seed.toString('hex'));
    
    const master = bitcoin.bip32.fromSeed(seed);
    console.log('master', master.toWIF());
    
    
    
    
    
    
    
    
    // const seed = bip39.mnemonicToSeed(this.keys.master);
    // this.root = hdkey.fromMasterSeed(seed);
    this.root = master;

    if (this.keys.seed) {
      for (const key in this.keys.seed) {
        if (this.keys.seed.hasOwnProperty(key)) {
          const rootSeed = bip39.mnemonicToSeed(this.keys.seed[key]);
          this.seed[key] = hdkey.fromMasterSeed(rootSeed);
        }
      }
    }
  }

  /**
   * Derive PrivateKey from root by blockchain and index
   * @param account 
   */
  public derivePrivateKey (account: Account): Buffer | string {
    const bp44number = BCList[account.bc];

    const [type, link] = getParams(account.data);
    const id = generateId(account.bc, account.data);

    if (type === '02') {
      const path = `m/44'/${bp44number}'/0'/0/${parseInt(link, 10)}`;

      console.log(path);
      const key = this.root.derivePath(path).privateKey;
      console.log('key', key.toString('hex'));


      return key;
    } else if (type === '00') {
      return this.keys.pk[id];
    } else if (type === '01') {
      const path = `m/44'/${bp44number}/0'/0/0`;

      return this.seed[id].derive(path).privateKey;
    }
  }

  /**
   * Erase all credentionals
   */
  public clear () {
    this.keys = null;
    this.root = null;
    this.seed = null;
  }
}
