import * as bitcoin from 'bitcoinjs-lib';
import { NetworkType, BIP32 } from 'bip32';
import { isString } from 'lodash';

console.log(bitcoin);

const toSatoshi = str => Math.floor(parseFloat(str) * 1e8);

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



  public static getWallet (pk: BIP32 | string) {
    if (isString(pk)) {
      return bitcoin.ECPair.fromWIF(pk);
    }

    return pk;
  }

  public static getAddressFromKeys (wallet) {
    if (wallet.segwit === true) {
      const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network });
      return bitcoin.payments.p2sh({ redeem: p2wpkh, network: wallet.keys.network }).address;
    } else {
      return bitcoin.payments.p2pkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network }).address;
    }
  }

  public static getTxHash ({ wallet, inputs, to, amount, fee, version, data }) {
    let pay2;
    if (wallet.segwit === true) {
      const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network });
      pay2 = bitcoin.payments.p2sh({ redeem: p2wpkh, network: wallet.keys.network });
    } else {
      pay2 = bitcoin.payments.p2pkh({ pubkey: wallet.keys.publicKey, network: wallet.keys.network });
    }

    const txb = new bitcoin.TransactionBuilder(wallet.keys.network);
    if (version) {
      txb.setVersion(version);
    }

    let total = 0;
    inputs.forEach(element => {
        txb.addInput(element.txid, element.output_no);
        total += toSatoshi(element.value);
    });

    if (data) {
      const bitcoinPayload = Buffer.from(data, 'utf8');
      const embed = bitcoin.payments.embed({ data: [bitcoinPayload] })
      
      txb.addOutput(embed.output, 0);
    }

    txb.addOutput(to, amount);
    txb.addOutput(pay2.address, total - amount - fee);

    inputs.forEach((element, index) => {
      if (wallet.segwit === true) {
        txb.sign(index, wallet.keys, pay2.redeem.output, null, toSatoshi(element.value));
      } else {
        txb.sign(index, wallet.keys);
      }
    });

    const t = txb.build();

    return {
        "id": t.getId(),
        "hex": t.toHex()
    }
  }
}
