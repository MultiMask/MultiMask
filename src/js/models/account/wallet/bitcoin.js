import bitcoin from 'bitcoinjs-lib';
import Mnemonic from 'bitcore-mnemonic';
import axios from 'axios';

import log from 'loglevel';

const URL_NODE = 'https://testnet.blockchain.info';
// const NETWORK = 'testnet';
// const NETWORK = "livenet";

export default class BitcoinWallet {
  constructor(network) {
    this.network = network;
  }

  create(seed) {
    const mnemonic = new Mnemonic(seed);

    const HDPrivateKey = mnemonic.toHDPrivateKey(null, this.network);

    this.priv = HDPrivateKey.privateKey.toWIF();
    this.address = HDPrivateKey.privateKey.toAddress(this.network).toString();

    return mnemonic.toString();
  }

  getInfo() {
    return axios.get(`${URL_NODE}/rawaddr/${this.address}`).then(res => {
      const lastOUT = res.data.txs[0];
      const output = lastOUT ? lastOUT.hash : null;
      const outputIndex = lastOUT && lastOUT.out ? lastOUT.out.findIndex(item => item.addr === this.address) : null;

      return {
        index: outputIndex,
        address: res.data.address,
        output: output,
        balance: res.data.final_balance / 1e8,
        txs: res.data.txs
      };
    });
  }

  createTX({ to, amount, data }) {
    return this.getInfo().then(({ output, balance, index }) => {
      const privateKey = this.priv;
      const address = this.address;
      // SEND signed Tx
      log.info('create TX with: ');
      log.info('to: ', to);
      log.info('amount: ', amount);
      log.info('data: ', data);
      log.info('output: ', output);
      // console.log('balance: ', balance);

      let amountInSatoshi = amount * 1e8;
      let SUM = balance * 1e8;
      log.info('balance:', SUM);

      let testnet = bitcoin.networks.testnet;
      let txb = new bitcoin.TransactionBuilder(testnet);
      let keyPair = bitcoin.ECPair.fromWIF(privateKey, testnet);

      txb.addInput(output, index);

      if (data) {
        let bitcoin_payload = Buffer.from(data, 'utf8');
        let dataScript = bitcoin.script.nullData.output.encode(bitcoin_payload);

        txb.addOutput(dataScript, 0);
      }

      let amountToReturn = SUM - amountInSatoshi - 5000;

      txb.addOutput(to, amountInSatoshi);
      txb.addOutput(address, +amountToReturn.toFixed(0));

      txb.sign(0, keyPair);

      log.info('TX = ', txb.build().toHex());

      return axios.post(`${URL_NODE}/pushtx`, 'tx=' + txb.build().toHex()).then(hash => {
        log.info('TX hash:', hash);

        return { hash };
      });
    });
  }
}
