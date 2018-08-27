import Web3 = require('web3');
import { info } from 'loglevel';
import EthEngine from './engine';

const net = 'https://ropsten.infura.io/';
const web3 = new Web3(new Web3.providers.HttpProvider(net));

export default class EthWallet {
  public engine: any;
  public network: any;
  public priv: any;
  public privHex: any;
  public public: any;
  public address: any;
  public nonce: any;

  constructor({ network }) {
    this.engine = new EthEngine();
    this.network = network;
  }

  create(_seed) {
    const seed = _seed || this.engine.generateMnemonic();
    ({ priv: this.priv, privHex: this.privHex } = this.engine.getPrivKeyFromSeed(seed));

    this.public = this.engine.getPublic(this.priv);
    this.address = this.engine.getEthereumAddress(this.priv);

    return seed;
  }

  getAddress() {
    return this.address;
  }

  getInfo() {
    return Promise.all([web3.eth.getBalance(this.address), this.engine.getTransactions(this.address)]).then(
      ([amountInWei, txs]) => {
        this.nonce = txs && txs[0] ? +txs[0].nonce : 0;

        return {
          address: this.address,
          balance: web3.utils.fromWei(amountInWei, 'ether'),
          txs
        };
      }
    );
  }

  getNextNonce() {
    return this.nonce + 1;
  }

  updateNonce() {
    this.nonce++;
  }

  createTX({ to, amount, data }) {
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const tx = this.engine.signEthTx({
      privKey: this.privHex,
      amount: amountInWei,
      to,
      from: this.address
    });

    info(tx);

    return new Promise((res, rej) => {
      web3.eth.sendSignedTransaction(tx, function (err, transactionHash) {
        if (err) {
          rej(err);
        }

        info('Transaction success > ', transactionHash);
        res(transactionHash);
      });
    });
  }

  // TODO: provide to Account entity
  signRawTx(data) {
    return this.engine.signRawTx(data, this.privHex);
  }
}
