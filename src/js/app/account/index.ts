import uuid from 'uuid/v4';
import { info } from 'loglevel';

export default class Account {
  public wallet: any;
  public network: any;
  public blockchain: any;
  public id: any;
  public secret: any;
  public name: any;

  constructor({ wallet, network, blockchain, name, secret = { seed: null }, id = uuid() }) {
    this.wallet = wallet;

    this.network = network;
    this.blockchain = blockchain;
    this.id = id;
    this.secret = secret;

    this.name = name ? name : this.createName();
    this.secret.seed = this.create(secret.seed);
  }

  createName() {
    return Date.now();
  }

  create(seed) {
    return this.wallet.create(seed);
  }

  getSeed() {
    return this.secret.seed;
  }

  getAddress() {
    return this.wallet.getAddress();
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
    info('Sending tx > ', this.blockchain, this.network, this.name, tx);
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
