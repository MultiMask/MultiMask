import Web3 from 'web3';
import log from 'loglevel';
import EthEngine from './engine';

const testnet = 'https://ropsten.infura.io/';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

export default class EthWallet {
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
      ([amountInWei, txResult]) => {
        return {
          address: this.address,
          balance: web3.utils.fromWei(amountInWei, 'ether'),
          txs: txResult.result
        };
      }
    );
  }

  createTX({ to, amount, data }) {
    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const tx = this.engine.signEthTx({
      privKey: this.privHex,
      amount: amountInWei,
      to,
      from: this.address
    });

    log.info(tx);

    return new Promise((res, rej) => {
      web3.eth.sendSignedTransaction(tx, function(err, transactionHash) {
        if (err) {
          rej(err);
        }

        log.info('Transaction success > ', transactionHash);
        res(transactionHash);
      });
    });
  }
}
