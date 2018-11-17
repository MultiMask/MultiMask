import * as bitcoin from 'bitcoinjs-lib';
import { isString } from 'lodash';
import { NetworkType, BIP32 } from 'bip32';

interface IWalletCrypto {
  private: string;
  address: string;
  scriptPubkey?: Buffer;
}

export class BTCEngine {
  public static createWallet (pk: BIP32 | string, network?: NetworkType): Promise<IWalletCrypto> {
    console.log(pk);
    if (isString(pk)) {

    } else {
      const privateKey = pk.privateKey;
      const publicKey = pk.publicKey;

      const address = bitcoin.payments.p2pkh({ pubkey: publicKey, network }).address;

      console.log(privateKey.toString('hex'))
      console.log(publicKey.toString('hex'))
      console.log(address)

      return Promise.resolve({
        private: privateKey.toString('hex'),
        address,
      });
    }


    // const keyPair = isString(pk)
    //   ? bitcoin.ECPair.fromWIF(pk)
    //   : bitcoin.bip32.fromSeed(pk, network);
  }

  public static createSegWitWallet (pk: BIP32 | string, network?: NetworkType): Promise<IWalletCrypto> {
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

    // console.log(pk);
    // if (isString(pk)) {

    // } else {
    //   const privateKey = pk.privateKey;
    //   const publicKey = pk.publicKey;

    //   const address = bitcoin.payments.p2pkh({ pubkey: publicKey, network }).address;

    //   console.log(privateKey.toString('hex'))
    //   console.log(publicKey.toString('hex'))
    //   console.log(address)

    //   return Promise.resolve({
    //     private: privateKey.toString('hex'),
    //     address,
    //   });
    // }
  }
}
