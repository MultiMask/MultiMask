import bitcoin from 'bitcoinjs-lib/';
import * as bip39 from 'bip39';
import { NetworkType, BIP32 } from 'bip32';

import Account from 'app/account';
import { BCList } from 'bcnetwork';
import { isSeed } from 'helpers/checkers';
import { getParams, generateId } from 'helpers/profiles';

const getPath = (bc, idx) => `m/44'/${bc}'/0'/0/${idx}`;
const getBip32FromMnemonic = mnemonic => {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Wrong mnemonic');
  }

  const seed = bip39.mnemonicToSeed(mnemonic);
  return bitcoin.bip32.fromSeed(seed);
}

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
      return getBip32FromMnemonic(mnemonic);
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

    if (this.keys.seed) {
      for (const key in this.keys.seed) {
        if (this.keys.seed.hasOwnProperty(key)) {
          const rootSeed = bip39.mnemonicToSeed(this.keys.seed[key]);
          this.seed[key] = bitcoin.bip32.fromSeed(rootSeed);
        }
      }
    }
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
      const root = account.network.btc
        ? bitcoin.bip32.fromSeed(this.masterSeed, account.network.btc)
        : this.root;
      
      const path = getPath(bp44number, parseInt(link, 10));
      return root.derivePath(path);

    } else if (type === '00') {
      return this.keys.pk[id];

    } else if (type === '01') {
      return this.seed[id];
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
