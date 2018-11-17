import { info } from 'loglevel';
import * as bitcoin from 'bitcoinjs-lib';
import explorer from './explorer';

import { IWallet, INetwork } from 'types/accounts';
import { BTCEngine } from './engine';
import { BIP32 } from 'bip32';
import { BCSign } from 'bcnetwork';

const DEFAULT_FEE = 5000; // Satoshi

export class BitcoinWallet implements IWallet {
  private walletKeys = null;
  public address = null;

  public network: INetwork;
  public segWit = false;

  /**
   * Create PK, address
   * @param pk 
   */
  public create (pk: BIP32 | string, network?: string) {
    this.changeNetwork(network);


    this.walletKeys = {
      keys: BTCEngine.getWallet(pk),
      segwit: this.segWit,
    }


    this.address = BTCEngine.getAddressFromKeys(this.walletKeys);

    return Promise.resolve();
  }

 
  /**
   * Change network
   * @param network 
   * @param pk 
   */
  public changeNetwork (network: any) {
    this.network = network;
  }

  public getAddress () {
    return this.address;
  }

  /**
   * Return info about blockchain
   */
  public getInfo () {
    return explorer.getInfo(this.address, mapNetToExplore(this.network))
      .then(({ data }) => {
        const payload = data.data;

        return {
          address: this.getAddress(),
          balance: payload.balance,
          network: this.network.sign,
          txs: payload.txs
        }
      })
  }

  /**
   * Send some coins
   * @param opts 
   */
  public sendCoins (opts) {
    explorer.getUnspentTX(this.address, mapNetToExplore(this.network))
      .then(res => {
        const inputs = res.data.data.txs;

        const tx = BTCEngine.getTxHash(this.walletKeys, inputs, opts.to, opts.amount, 5000);
        console.log(tx);
      })


      return Promise.resolve();
    // return this.buildTX(opts)
    //   .then(this.signTX)
    //   .then(this.BuildToHex)
    //   .then(signedTX => {
    //     info('TX = ', signedTX);

    //     return axios.post(`${this.network.url}/pushtx`, 'tx=' + signedTX).then(hash => {
    //       info('TX hash:', hash);
    
    //       return { hash };
    //     });
    //   })
  }


  // private buildTX ({ to, amount, data, fee }) {
  //   return this.getInfo().then(({ outputs, balance }) => {
  //     info('create TX with >> ');
  //     info('to: ', to);
  //     info('data: ', data);
  //     info('outputs: ', outputs);

      
  //     const amountInSatoshi = amount * 1e8;
  //     const balanceInSatoshi = balance * 1e8;
  //     info('amount: ', amountInSatoshi);
  //     info('balance:', balanceInSatoshi);

  //     const testnet = bitcoin.networks.testnet;
  //     const txb = new bitcoin.TransactionBuilder(testnet);

  //     outputs.forEach(out => {
  //       if (this.segWit) {
  //         txb.addInput(out.hash, out.idx, null, this.scriptPubkey);
  //       } else {
  //         txb.addInput(out.hash, out.idx);
  //       }
  //     })
      
  //     // Put data in hex to OP_RETURN 
  //     if (data) {
  //       const bitcoinPayload = Buffer.from(data, 'utf8');
  //       const dataScript = bitcoin.script.nullData.output.encode(bitcoinPayload);
        
  //       txb.addOutput(dataScript, 0);
  //     }
  //     const minorFee = fee || DEFAULT_FEE;
  //     const amountToReturn = balanceInSatoshi - amountInSatoshi - minorFee;
      
  //     txb.addOutput(to, amountInSatoshi);
  //     txb.addOutput(this.address, +amountToReturn.toFixed(0));

  //     return txb;
  //   });
  // }

  // private signTX = (txb) => {
  //   const testnet = bitcoin.networks.testnet;
  //   const keyPair = bitcoin.ECPair.fromWIF(this.private, testnet);

  //   // Sign all inputs
  //   txb.inputs.forEach((input, idx) => {
  //     txb.sign(idx, keyPair);
  //   });

  //   return txb;
  // }

  // private BuildToHex = (txb) => {
  //   return txb.build().toHex();
  // }
}

const mapNetToExplore = (net: INetwork) => {
  
  if (net.sign === 'testnet') {
    return explorer.coinsigns.BTCTEST;
  }

  if (net.sign === 'mainnet') {
    return explorer.coinsigns.BTC;
  }
}
