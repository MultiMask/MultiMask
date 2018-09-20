import uuid from 'uuid/v4';

import BTC from './plugins/btcPlugin';
import Eth from './plugins/ethPlugin';
import EOS from './plugins/eosPlugin';

import NetworkMessage from 'models/NetworkMessage';
import { DanglingResolver } from 'models/DanglingResolver';

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
  public btc;
  public eos;
  public eth;

  constructor (_stream) {
    stream = _stream;

    resolvers = [];
    _subscribe();

    this.btc = BTC(_send);
    this.eth = Eth(_send);
    this.eos = EOS(_send);
  }

  public isAuth () { }
}
