import * as bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';

interface IWalletCrypto {
  private: string;
  address: string;
  scriptPubkey?: Buffer;
}

export class BTCEngine {
  public static createWallet (pk: Buffer, network?: bitcoin.Network): Promise<IWalletCrypto> {
    const keyPair = bitcoin.HDNode.fromSeedBuffer(pk, network).keyPair;

    return Promise.resolve({
      private: keyPair.toWIF(),
      address: keyPair.getAddress(),
    });
  }

  public static createSegWitWallet (pk: Buffer, network?: bitcoin.Network): Promise<IWalletCrypto> {
    const keyPair = bitcoin.HDNode.fromSeedBuffer(pk, network).keyPair;

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
