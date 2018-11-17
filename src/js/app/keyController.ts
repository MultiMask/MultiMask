import bitcoin from 'bitcoinjs-lib/';
import hdkey from 'hdkey';
import * as bip39 from 'bip39';
import { NetworkType, BIP32 } from 'bip32';

import Account from 'app/account';
import { BCList } from 'bcnetwork';
import { isSeed } from 'helpers/checkers';
import { getParams, generateId } from 'helpers/profiles';
import { stringToHex } from 'helpers/func';

console.log(bitcoin);

const getPath = (bc, idx) => `m/44'/${bc}'/0'/0/${idx}`;

/**
 * Store HD key in memory and devire key for wallets
 */
export class KeyController {
  private keys: IKeyStore = null;
  private masterSeed = null;
  private seed: Record<string, BIP32> = {};
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
      const path = getPath(bp44number, 0);

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
    this.masterSeed = bip39.mnemonicToSeed(this.keys.master);
    this.root = bitcoin.bip32.fromSeed(this.masterSeed);

    console.log('mnemonic', this.keys.master);
    console.log('seed', this.masterSeed.toString('hex'));
    // console.log('master', this.root.toWIF());    

    // if (this.keys.seed) {
    //   for (const key in this.keys.seed) {
    //     if (this.keys.seed.hasOwnProperty(key)) {
    //       const rootSeed = bip39.mnemonicToSeed(this.keys.seed[key]);
    //       this.seed[key] = hdkey.fromMasterSeed(rootSeed);
    //     }
    //   }
    // }
  }

  /**
   * Derive PrivateKey from root by blockchain and index
   * @param account 
   */
  public derivePrivateKey (account: Account, network?: NetworkType): BIP32 | string {
    const bp44number = BCList[account.bc];

    const [type, link] = getParams(account.data);
    const id = generateId(account.bc, account.data);

    if (type === '02') {
      console.log('network', account.network.btc);

      // const root = account.network.btc
      //   ? bitcoin.bip32.fromSeed(this.masterSeed, account.network.btc)
      //   : this.root;
      let root;
      if (account.network.btc) {
        root = bitcoin.bip32.fromSeed(this.masterSeed, account.network.btc);
        console.log('btc');
      } else {
        console.log('coomon');
        root = this.root;
      }
      console.log('master', root.toWIF());

      const path = getPath(bp44number, parseInt(link, 10));
      const key = root.derivePath(path);
      
      console.log('path', path);
      console.log('key', key.toWIF());
      
      return key;
    } else if (type === '00') {
      return this.keys.pk[id];
    } else if (type === '01') {
      const path = getPath(bp44number, 0);

      return this.seed[id].derivePath(path);
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
