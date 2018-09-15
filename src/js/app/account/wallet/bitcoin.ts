import * as bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';
import axios from 'axios';

import { info } from 'loglevel';

const URL_NODE = 'https://testnet.blockchain.info';
// const NETWORK = 'testnet';
// const NETWORK = "livenet";

export default class BitcoinWallet {
  public network: any;
  public priv: any;
  public address: any;

  constructor(network) {
    this.network = network;
  }

  public create(seed) {
    const mnemonic = new Mnemonic(seed);

    const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);

    this.priv = HDPrivateKey.privateKey.toWIF();
    this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();

    return mnemonic.toString();
  }

  public changeNetwork(network: string, seed: string) {
    this.network = network

    const mnemonic = new Mnemonic(seed);
  
    const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);
  
    this.priv = HDPrivateKey.privateKey.toWIF();
    this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();
  }

  public getAddress() {
    return this.address;
  }

  public getInfo() {
    return axios.get(`${URL_NODE}/rawaddr/${this.address}`).then(res => {
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
    });
  }

  public createTX(opts) {
    return this.buildTX(opts)
      .then(this.signTXBuild)
      .then(signedTX => {
        info('TX = ', signedTX);

        return axios.post(`${URL_NODE}/pushtx`, 'tx=' + signedTX).then(hash => {
          info('TX hash:', hash);
    
          return { hash };
        });
      })
  }

  private buildTX({ to, amount, data }) {
    return this.getInfo().then(({ outputs, balance }) => {
      info('create TX with >> ');
      info('to: ', to);
      info('amount: ', amount);
      info('data: ', data);
      info('outputs: ', outputs);

      const amountInSatoshi = amount * 1e8;
      const balanceInSatoshi = balance * 1e8;
      info('balance:', balanceInSatoshi);

      const testnet = bitcoin.networks.testnet;
      const txb = new bitcoin.TransactionBuilder(testnet);

      outputs.forEach((out, idx) => {
        txb.addInput(out.hash, out.idx);
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

  private signTXBuild = (txb) => {
    const privateKey = this.priv;
    const testnet = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);

    // Sign all inputs
    txb.inputs.forEach((input, idx) => {
      txb.sign(idx, keyPair);
    });

    return txb.build().toHex();
  }
}
