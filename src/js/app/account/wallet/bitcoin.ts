import { info } from 'loglevel';
import * as bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';
import axios from 'axios';

import { BTCEngine } from './btc/engine';
import networks from '../../../blockchain'


export default class BitcoinWallet implements IWallet {
  public network: any;
  public priv: any;
  public address: any;
  public networkUrl: string;

  public segWit = false;
  public scriptPubkey;      // segWit scriptPubkey

  constructor (network) {
    this.network = network;

    this.setNetworkUrl(network)
  }

  public create (seed) {
    return this._createWallet(seed, bitcoin.networks.testnet).then(secret => {
      console.log(secret);
      Object.assign(this, secret);

      return secret.seed;
    });
  }

  private _createWallet (seed, network) {
    return this.segWit
    ? BTCEngine.createSegWitWallet(seed, network)
    : BTCEngine.createWallet(seed, network);
  }
 
  public changeNetwork (network: string, seed: string) {
    // TODO: use _createWallet to generate address
    this.network = network;

    const mnemonic = new Mnemonic(seed);
  
    const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);
  
    this.priv = HDPrivateKey.privateKey.toWIF();
    this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();
    
    this.setNetworkUrl(network)
  }

  private setNetworkUrl (network) {
    const networkProps = networks.BTC.network.find(item => item.sign === network)
    this.networkUrl = networkProps.url;
  }

  public getAddress () {
    return this.address;
  }

  public getInfo () {
    return axios.get(`${this.networkUrl}/rawaddr/${this.address}`)
        .then(res => {
        const outputs = [];

        res.data.txs.forEach(tx => {
          tx.out.forEach((out, idx) => {
            if (out.addr === this.address && !out.spent) {
              outputs.push({
                hash: tx.hash,
                idx
              })
            }
          })
        })

        return {
          address: res.data.address,
          outputs,
          balance: res.data.final_balance / 1e8,
          network: this.network,
          txs: res.data.txs
        };
      })
  }

  public sendCoins (opts) {
    return this.buildTX(opts)
      .then(this.signTX)
      .then(this.BuildToHex)
      .then(signedTX => {
        info('TX = ', signedTX);

        return axios.post(`${this.networkUrl}/pushtx`, 'tx=' + signedTX).then(hash => {
          info('TX hash:', hash);
    
          return { hash };
        });
      })
  }

  private buildTX ({ to, amount, data }) {
    return this.getInfo().then(({ outputs, balance }) => {
      info('create TX with >> ');
      info('to: ', to);
      info('amount: ', amount);
      info('data: ', data);
      info('outputs: ', outputs);

      const amountInSatoshi = amount;
      const balanceInSatoshi = balance * 1e8;
      info('balance:', balanceInSatoshi);

      const testnet = bitcoin.networks.testnet;
      const txb = new bitcoin.TransactionBuilder(testnet);

      outputs.forEach((out, idx) => {
        if (this.segWit) {
          txb.addInput(out.hash, out.idx, null, this.scriptPubkey);
        } else {
          txb.addInput(out.hash, out.idx);
        }
      })
      
      // Put data in hex to OP_RETURN 
      if (data) {
        const bitcoin_payload = Buffer.from(data, 'utf8');
        const dataScript = bitcoin.script.nullData.output.encode(bitcoin_payload);
        
        txb.addOutput(dataScript, 0);
      }
      
      const fee = 5000;
      const amountToReturn = balanceInSatoshi - amountInSatoshi - fee;
      
      txb.addOutput(to, amountInSatoshi);
      txb.addOutput(this.address, +amountToReturn.toFixed(0));
      
      return txb;
    });
  }

  private signTX = (txb) => {
    const privateKey = this.priv;
    const testnet = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);

    // Sign all inputs
    txb.inputs.forEach((input, idx) => {
      txb.sign(idx, keyPair);
    });

    return txb;
  }

  private BuildToHex = (txb) => {
    return txb.build().toHex();
  }
}
