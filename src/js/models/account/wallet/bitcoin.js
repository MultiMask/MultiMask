import bitcoin from "bitcoinjs-lib";
import Mnemonic from "bitcore-mnemonic";
// import bip38 from "bip38";
// import wif from "wif";

import axios from 'axios';

const URL_NODE = 'https://testnet.blockchain.info';
const NETWORK = "testnet";
// const NETWORK = "livenet";

export default class BitcoinWallet {
  constructor() {}
  
  create(seed) {
    this.mnemonic = new Mnemonic(seed);
    this.seed = this.mnemonic.toString();

    const HDPrivateKey = this.mnemonic.toHDPrivateKey(null, NETWORK);
    // console.log(HDPrivateKey);

    this.priv = HDPrivateKey.privateKey.toWIF();
    this.address = HDPrivateKey.privateKey.toAddress(NETWORK).toString();
  }

  getSeed() {
    return this.seed;
  }

  /**
   * Depricated, Use bitcoinjs-lib
   */
  // create(pass) {
    // const testnet = bitcoin.networks.bitcoin;
    // const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

    // this.pk = keyPair.toWIF();
    // this.address = keyPair.getAddress();
    // this.pass = pass;
  // }

  /**
   * Depricated, testing BIP-38
   */
  // test() {
    // console.log('test');
    // const testnet = bitcoin.networks.testnet;
    // const keyPair = bitcoin.ECPair.makeRandom({ network: testnet });

    // const pass = '12345567ONE';

    // this.pk = keyPair.toWIF();
    // this.address = keyPair.getAddress();
    // this.pass = pass;

    // // console.log(testnet);
    // // console.log(keyPair);
    // console.log('private: ',this.pk);
    // // console.log(this.address);

    // let decoded = wif.decode(this.pk);

    // var encryptedKey = bip38.encrypt(
    //   decoded.privateKey,
    //   decoded.compressed,
    //   pass
    // );

    // console.log('encrypt', encryptedKey);

    // var decryptedKey = bip38.decrypt(encryptedKey, pass, function(status) {
    //   //   console.log(status.percent); // will print the precent every time current increases by 1000
    // });

    // console.log('decrypt',
    //   wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed)
    // );
  // }

  getInfo() {
    return axios.get(`${URL_NODE}/rawaddr/${this.address}`).then(res => {
      const lastOUT = res.data.txs[0];
      const output = lastOUT ? lastOUT.hash : null;
      const outputIndex = lastOUT && lastOUT.out 
        ? lastOUT.out.findIndex(item => item.addr === this.address)
        : null;

      return {
        index: outputIndex,
        address: res.data.address,
        output: output,
        balance: res.data.final_balance / 1e8,
        txs: res.data.txs
      }
    });
  }

  createTX({ to, amount, data }) {
    this.getInfo().then(({ output, balance, index }) => {

      // SEND signed Tx
      console.log("create TX with: ");
      // console.log('private: ', this.pk);
      // console.log('to: ', to);
      // console.log('amount: ', amount);
      // console.log('data: ', data);
      // console.log('output: ', output);
      // console.log('balance: ', balance);

      let SUM = balance;

      let testnet = bitcoin.networks.testnet;
      let bitcoin_payload = Buffer.from(data, 'utf8');
      let dataScript = bitcoin.script.nullData.output.encode(bitcoin_payload);
      let keyPair = bitcoin.ECPair.fromWIF(this.pk, testnet);

      let txb = new bitcoin.TransactionBuilder(testnet)
      txb.addInput(output, index);

      txb.addOutput(dataScript, 0)
      txb.addOutput(to, amount);
      txb.addOutput(this.address, SUM - amount - 5000);
      txb.sign(0, keyPair);

      axios.post(`${URL_NODE}/pushtx`, 'tx=' + txb.build().toHex()).then((data) => {
        console.log('TX hash:', data);
      })
    })
  }
}
