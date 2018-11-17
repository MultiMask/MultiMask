import * as bitcoin from 'bitcoinjs-lib';
import { NetworkType, BIP32 } from 'bip32';
import { isString } from 'lodash';

interface IWalletCrypto {
  private: string;
  address: string;
  scriptPubkey?: Buffer;
}

export class BTCEngine {
  public static createWallet (pk: BIP32 | string, network?: NetworkType): Promise<IWalletCrypto> {
    let privateKey,
      publicKey;

    if (isString(pk)) {
      const keyPair = bitcoin.ECPair.fromWIF(pk);
      
      privateKey = keyPair.privateKey;
      publicKey = keyPair.publicKey;
    } else {
      privateKey = pk.privateKey;
      publicKey = pk.publicKey;
    }
    
    const address = bitcoin.payments.p2pkh({ pubkey: publicKey, network }).address;

    return Promise.resolve({
      private: privateKey.toString('hex'),
      public:  publicKey.toString('hex'),
      address,
    });
  }

  public static createSegWitWallet (pk: BIP32 | string, network?: NetworkType): Promise<IWalletCrypto> {
    let privateKey,
      publicKey;

    if (isString(pk)) {
      const keyPair = bitcoin.ECPair.fromWIF(pk);
      
      privateKey = keyPair.privateKey;
      publicKey = keyPair.publicKey;
    } else {
      privateKey = pk.privateKey;
      publicKey = pk.publicKey;
    }

    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: publicKey, network }),
        address = bitcoin.payments.p2sh({ redeem: p2wpkh, network }).address;

    return Promise.resolve({
      private: privateKey.toString('hex'),
      public:  publicKey.toString('hex'),
      scriptPubkey: p2wpkh,
      address,
    });
  }
}
