import { info } from 'loglevel';
import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

import { BTCEngine } from './engine';
import ntx from 'bcnetwork';

const DEFAULT_FEE = 5000; // Satoshi

export class BitcoinWallet implements IWallet {
  private private: any;
  public network: any;
  public address: any;
  public scriptPubkey;      // segWit scriptPubkey
  public networkUrl: string;

  public segWit = false;

  /**
   * Create PK, address
   * @param pk 
   */
  public create (pk: Buffer | string, network?: string) {
    this.setNewNetwork(network);
    return this.createFactory(pk, mapNetwork(this.network)).then(secret => {
      Object.assign(this, secret);
      
      return true;
    });
  }

  /**
   * Choose segwit or not
   * @param pk 
   * @param network 
   */
  private createFactory (pk: Buffer | string, network: bitcoin.Network) {
    return this.segWit
    ? BTCEngine.createSegWitWallet(pk, network)
    : BTCEngine.createWallet(pk, network);
  }
 
  /**
   * Change network
   * @param network 
   * @param pk 
   */
  public changeNetwork (network: string, pk: Buffer) {
    this.network = network;
    
    return this.createFactory(pk, mapNetwork(this.network)).then(secret => {
      Object.assign(this, secret);

      this.setNewNetwork(network)
      return network;
    });
  }

  private setNewNetwork (network) {
    const networkProps = ntx.BTC.network.find(item => item.sign === network);

    this.networkUrl = networkProps.url;
    this.network = network;
  }

  public getAddress () {
    return this.address;
  }

  /**
   * Return info about blockchain
   */
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

        return axios.post(`${this.networkUrl}/pushtx`, 'tx=' + signedTX).then(hash => {
          info('TX hash:', hash);
    
          return { hash };
        });
      })
  }

  private buildTX ({ to, amount, data, fee }) {
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
      
      const minorFee = fee || DEFAULT_FEE;
      const amountToReturn = balanceInSatoshi - amountInSatoshi - minorFee;
      
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

const mapNetwork = (network: string) => {
  switch (network) {
    case 'testnet':
      return bitcoin.networks.testnet;
    case 'mainnet':
      return bitcoin.networks.bitcoin;
  }
}
