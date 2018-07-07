export default class Account {
  constructor({ wallet, network, blockchain, name, seed }) {
    this.network = network;
    this.wallet = wallet;
    this.blockchain = blockchain;

    this.name = name ? name : this.getName();
    this.create(seed);
  }

  getName() {
    return Date.now();
  }

  create(seed) {
    this.wallet.create(seed);
  }

  getSeed() {
    return this.wallet.getSeed();
  }

  getInfo() {
    return this.wallet.getInfo().then(info => ({
      name: this.name,
      blockchain: this.blockchain,
      network: this.network,
      info
    }));
  }

  sendTX(tx) {
    return this.wallet.createTX(tx);
  }
}
