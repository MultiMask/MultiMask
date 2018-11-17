import { info } from 'loglevel';
import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

import { IWallet } from 'types/accounts';
import { BTCEngine } from './engine';
import { BIP32 } from 'bip32';

const DEFAULT_FEE = 5000; // Satoshi

export class BitcoinWallet implements IWallet {
  private private: any;
  public network: any;
  public address: any;
  public scriptPubkey;      // segWit scriptPubkey

  public segWit = false;

  /**
   * Create PK, address
   * @param pk 
   */
  public create (pk: BIP32 | string, network?: string) {
    this.changeNetwork(network);

    return this.createFactory(pk, this.network.btc).then(secret => {
      Object.assign(this, secret);

      console.log(secret)
      
      return true;
    });
  }

  /**
   * Choose segwit or not
   * @param pk 
   * @param network 
   */
  private createFactory (pk: BIP32 | string, network: bitcoin.Network) {
    return this.segWit
    ? BTCEngine.createSegWitWallet(pk, network)
    : BTCEngine.createWallet(pk, network);
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
    return axios.get(`${this.network.url}/rawaddr/${this.address}`)
        .then(res => {
        const outputs = [];

        console.log(res.data);

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
          network: this.network.sign,
          txs: res.data.txs
        };
      })
  }

  /**
   * Send some coins
   * @param opts 
   */
  public sendCoins (opts) {
    return this.buildTX(opts)
      .then(this.signTX)
      .then(this.BuildToHex)
      .then(signedTX => {
        info('TX = ', signedTX);

        return axios.post(`${this.network.url}/pushtx`, 'tx=' + signedTX).then(hash => {
          info('TX hash:', hash);
    
          return { hash };
        });
      })
  }

  private buildTX ({ to, amount, data, fee = DEFAULT_FEE }) {
    return this.getInfo().then(({ outputs, balance }) => {
      info('create TX with >> ');
      info('to: ', to);
      info('data: ', data);
      info('outputs: ', outputs);
      
      const amountInSatoshi = amount * 1e8;
      const balanceInSatoshi = balance * 1e8;
      info('amount: ', amountInSatoshi);
      info('balance:', balanceInSatoshi);

      const testnet = bitcoin.networks.testnet;
      const txb = new bitcoin.TransactionBuilder(testnet);

      outputs.forEach(out => {
        if (this.segWit) {
          txb.addInput(out.hash, out.idx, null, this.scriptPubkey);
        } else {
          txb.addInput(out.hash, out.idx);
        }
      })
      
      // Put data in hex to OP_RETURN 
      if (data) {
        const bitcoinPayload = Buffer.from(data, 'utf8');
        const dataScript = bitcoin.script.nullData.output.encode(bitcoinPayload);
        
        txb.addOutput(dataScript, 0);
      }
      
      const amountToReturn = balanceInSatoshi - amountInSatoshi - fee;
      
      txb.addOutput(to, amountInSatoshi);
      txb.addOutput(this.address, +amountToReturn.toFixed(0));

      return txb;
    });
  }

  private signTX = (txb) => {
    const testnet = bitcoin.networks.testnet;
    const keyPair = bitcoin.ECPair.fromWIF(this.private, testnet);

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
