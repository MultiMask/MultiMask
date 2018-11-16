import * as bitcoin from 'bitcoinjs-lib';
import { isString } from 'lodash';

interface IWalletCrypto {
  private: string;
  address: string;
  scriptPubkey?: Buffer;
}

export class BTCEngine {
  public static createWallet (pk: Buffer | string, network?: bitcoin.Network): Promise<IWalletCrypto> {
    const keyPair = isString(pk)
      ? bitcoin.ECPair.fromWIF(pk)
      : bitcoin.bip32.fromSeed(pk, network).keyPair;

    return Promise.resolve({
      private: keyPair.toWIF(),
      address: keyPair.getAddress(),
    });
  }

  public static createSegWitWallet (pk: Buffer | string, network?: bitcoin.Network): Promise<IWalletCrypto> {
    const keyPair = isString(pk)
      ? bitcoin.ECPair.fromWIF(pk)
      : bitcoin.bip32.fromSeed(pk, network).keyPair;

    const scriptPubkey = bitcoin.script.witnessPubKeyHash.output.encode(
      bitcoin.crypto.hash160(	
        keyPair.getPublicKeyBuffer()
      )
    );
    const address = bitcoin.address.fromOutputScript(scriptPubkey, network);

    return Promise.resolve({
      private: keyPair.toWIF(),
      address,
      scriptPubkey
    });
  }
}
