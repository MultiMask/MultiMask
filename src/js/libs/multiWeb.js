import uuid from 'uuid/v4';

import networks from './../blockchain';
import Web3Provider from './plugins/eth';
import NetworkMessage from './../libs/NetworkMessage';

import { TX_APPROVE } from '../constants/tx';
import { CONTENT_APP } from '../constants/apps';

let stream;
let resolvers;

/***
 * This is just a helper to manage resolving fake-async
 * requests using browser messaging.
 */
class DanglingResolver {
  constructor(_id, _resolve, _reject) {
    this.id = _id;
    this.resolve = _resolve;
    this.reject = _reject;
  }
}

/***
 * Messages do not come back on the same thread.
 * To accomplish a future promise structure this method
 * catches all incoming messages and dispenses
 * them to the open promises. */
const _subscribe = () => {
  stream.listenWith(msg => {
    if (!msg || !msg.hasOwnProperty('type')) return false;
    for (let i = 0; i < resolvers.length; i++) {
      if (resolvers[i].id === msg.resolver) {
        if (msg.type === 'error') resolvers[i].reject(msg.payload);
        else resolvers[i].resolve(msg.payload);
        resolvers = resolvers.slice(i, 1);
      }
    }
  });
};

/***
 * Turns message sending between the application
 * and the content script into async promises
 * @param type
 * @param payload
 */
const _send = (type, payload) => {
  return new Promise((resolve, reject) => {
    let id = uuid();
    let message = new NetworkMessage(type, payload, id);
    resolvers.push(new DanglingResolver(id, resolve, reject));
    stream.send(message, CONTENT_APP);
  });
};

export default class MultiWeb {
  constructor(_stream) {
    stream = _stream;

    resolvers = [];
    _subscribe();

    this.web3 = new Web3Provider(_send);
  }

  isAuth() {}
  getUser() {}
  sendTransaction({ to, amount, data }) {
    this._send({
      type: TX_APPROVE,
      payload: {
        blockchain: networks.BTC.sign,
        tx: {
          to,
          amount,
          data
        }
      }
    });
  }

  getWeb3Provider() {
    return this.web3;
  }

  check() {
    _send('check', { payload: '2323' }).then(res => {
      console.log('take result', res);
    });
  }
}
