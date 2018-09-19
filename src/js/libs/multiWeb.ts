import uuid from 'uuid/v4';

import networks from 'bcnetwork';
import Web3Provider from './plugins/ethPlugin';

import NetworkMessage from 'models/NetworkMessage';
import { DanglingResolver } from 'models/DanglingResolver';

import { TX_APPROVE } from 'constants/tx';
import { CONTENT_APP } from 'constants/apps';

let stream;
let resolvers;

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
    const id = uuid();
    const message = new NetworkMessage(type, payload, id);
    resolvers.push(new DanglingResolver(id, resolve, reject));
    stream.send(message, CONTENT_APP);
  });
};

/**
 * Provide work with wallets
 */
export class MultiWeb {
  public web3;

  constructor (_stream) {
    stream = _stream;

    resolvers = [];
    _subscribe();

    this.web3 = Web3Provider(_send);
  }

  public isAuth () { }
  
  public sendTransaction ({ to, amount, data }) {
    _send(TX_APPROVE, {
      blockchain: networks.BTC.sign,
      tx: {
        to,
        amount,
        data
      }
    });
  }

  public getWeb3Provider () {
    return this.web3;
  }
}
