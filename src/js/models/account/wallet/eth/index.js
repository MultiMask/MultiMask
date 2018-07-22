import Web3 from 'web3';
import EthEngine from './engine';

const testnet = 'https://ropsten.infura.io/';
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

export default class EthWallet {
  constructor({ network }) {
    this.engine = new EthEngine();
    this.network = network;
  }

  create(seed) {
    this.seed = seed || this.engine.generateMnemonic();
    this.priv = this.engine.getPrivKeyFromSeed(this.seed);

    this.public = this.engine.getPublic(this.priv);
    this.address = this.engine.getEthereumAddress(this.priv);
  }

  getSeed() {
    return this.seed;
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

  createTX() {}
}
