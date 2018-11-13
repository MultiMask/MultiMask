import hdkey from 'hdkey';
import * as bip39 from 'bip39';

import Account from 'app/account';
import { BCList } from 'bcnetwork';

/**
 * Store HD key in memory and devire key for wallets
 */
export class KeyController {
  private keys: IKeyStore = null;
  private root: hdkey;

  /**
   * Assign plenty of keys to generate PK
   * @param keys 
   */
  public assignKeys (keys: IKeyStore): void {
    this.keys = keys;

    const seed = bip39.mnemonicToSeed(this.keys.master);
    this.root = hdkey.fromMasterSeed(seed);
  }

  /**
   * Derive PrivateKey from root by blockchain and index
   * @param account 
   */
  public derivePrivateKey (account: Account): Buffer {
    const bp44number = BCList[account.bc];

    const type = account.data.slice(0,2);
    const link = account.data.slice(2);

    if (type === '02') {
      const path = `m/44'/${bp44number}/0'/0/${parseInt(link, 10)}`;

      return this.root.derive(path).privateKey;
    }
  }
}
