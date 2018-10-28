import * as bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';

interface WalletCrypto {
  priv: any;
  pblc: any;
  address: string;
  seed: string;
  scriptPubkey?: Buffer;
}

export class BTCEngine {
  public static createWallet (seed, network: bitcoin.Network): Promise<WalletCrypto> {
    const mnemonic = new Mnemonic(seed);
    const HDPrivateKey = mnemonic.toHDPrivateKey(null, network);

    const priv = HDPrivateKey.privateKey.toWIF();
    const pblc = HDPrivateKey.publicKey.toString();
    const address = HDPrivateKey.privateKey.toAddress(network).toString();

    return Promise.resolve({
      priv,
      pblc,
      address,
      seed: mnemonic.toString(),
    });
  }

  public static createSegWitWallet (seed, network): Promise<WalletCrypto> {
    const mnemonic = new Mnemonic(seed);
    const HDPrivateKey = mnemonic.toHDPrivateKey(null, network);

    const priv = HDPrivateKey.privateKey.toWIF();
    const pblc = HDPrivateKey.publicKey.toString();

    const keypair = bitcoin.ECPair.fromWIF(priv, network);
    const scriptPubkey = bitcoin.script.witnessPubKeyHash.output.encode(
        bitcoin.crypto.hash160(	
            keypair.getPublicKeyBuffer()
        )
    );

    const address = bitcoin.address.fromOutputScript(scriptPubkey, network);

    return Promise.resolve({
      priv,
      pblc,
      address,
      seed: mnemonic.toString(),
      scriptPubkey
    });
  }
}
