import log from 'loglevel';

export default class Account {
  constructor({ wallet, network, blockchain, name, seed, id }) {
    this.network = network;
    this.wallet = wallet;
    this.blockchain = blockchain;
    this.id = id;

    this.name = name ? name : this.createName();
    this.create(seed);
  }

  createName() {
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
      id: this.id,
      name: this.name,
      blockchain: this.blockchain,
      network: this.network,
      info
    }));
  }

  sendTX(tx) {
    log.info('Sending tx > ', this.name, tx);
    return this.wallet.createTX(tx);
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      blockchain: this.blockchain,
      network: this.network,
      secret: {
        seed: this.wallet.seed
      }
    };
  }
}
