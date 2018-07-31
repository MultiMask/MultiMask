import uuid from 'uuid/v4';
import log from 'loglevel';

export default class Account {
  constructor({ wallet, network, blockchain, name, secret = { seed: null }, id = uuid() }) {
    this.wallet = wallet;

    this.network = network;
    this.blockchain = blockchain;
    this.id = id;
    this.secret = secret;

    this.name = name ? name : this.createName();
    this.create(secret.seed);
  }

  createName() {
    return Date.now();
  }

  create(seed) {
    this.wallet.create(seed);
  }

  getSeed() {
    return this.secret.seed;
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
    log.info('Sending tx > ', this.blockchain, this.network, this.name, tx);
    return this.wallet.createTX(tx);
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      blockchain: this.blockchain,
      network: this.network,
      secret: {
        seed: this.secret.seed
      }
    };
  }
}
