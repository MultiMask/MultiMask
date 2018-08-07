import uuid from 'uuid/v4';
import windowCtrl from './../../libs/txWindow';

const txs = [];

class TXModel {
  constructor(data, id, resolver) {
    this.data = data;
    this.id = id;
    this.resolver = resolver;
  }

  update(data) {
    this.data = {
      ...this.data,
      ...data
    };

    return this;
  }

  resolve() {
    this.resolver(this.data);

    return this;
  }
}

const find = id => {
  for (let i = txs.length - 1; i >= 0; i--) {
    if (txs[i].id == id) {
      return txs[i];
    }
  }
};

export default class TxController {
  static approveTx(opts) {
    return new Promise((res, rej) => {
      const tx = new TXModel(opts, uuid(), res);

      txs.push(tx);
      windowCtrl({});
    });
  }

  static getLast() {
    if (txs.length > 0) {
      return txs[txs.length - 1];
    }

    return null;
  }

  static confirm(id, data) {
    const tx = find(id);
    if (tx) {
      tx.update(data).resolve();
    }
  }

  static reject(id) {}
}
