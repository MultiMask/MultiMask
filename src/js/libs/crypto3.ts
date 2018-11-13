import uuid from 'uuid/v4';
import { ACCOUNT_INFO_DOMAIN } from '../constants/account';
import { TX_SEND } from '../constants/tx';
import BTC from './plugins/btcPlugin';
import Eth from './plugins/ethPlugin';
import EOS from './plugins/eosPlugin';

import { NetworkMessage } from 'models/NetworkMessage';
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
    if (!msg || !msg.hasOwnProperty('type')) {
      return false;
    }
    for (let i = 0; i < resolvers.length; i++) {
      if (resolvers[i].id === msg.resolver) {
        if (msg.type === 'error') {
          resolvers[i].reject(msg.payload);
        } else {
          resolvers[i].resolve(msg.payload);
        }
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
const _send = (type: string, payload?: any) => {
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
export class Crypto3 {
  public btc;
  public eos;
  public eth;
  private account: WalletInfo;

  constructor (_stream) {
    stream = _stream;

    resolvers = [];
    _subscribe();

    this.btc = BTC(_send);
    this.eth = Eth(_send);
    this.eos = EOS(_send);
  }

  public async getIdentity (entity: IIdentityProps) {
    const accounts = (await _send(ACCOUNT_INFO_DOMAIN)) as WalletInfo[];
    const account = accounts.find(item => item.blockchain === entity.blockchain && item.info.balance >= entity.amount);

    if (account) {
      this.account = account;
      return { to: entity.address, from: account.info.address, amount: entity.amount };
    }

    return Error('not found account for payment');
  }

  public async pay (payParams) {
    const tx = this.formatTX(payParams);
    const result = await _send(TX_SEND, { id: this.account.id, tx });
    return result;
  }

  private formatTX ({ to, amount, data }: IPayParams) {
    return {
      to,
      data,
      amount: parseFloat(amount)
    };
  }
}

interface IPayParams {
  to: string;
  amount: string;
  data?: string;
}

interface IIdentityProps {
  address: string;
  blockchain: BCType;
  chainId: number;
  amount: number;
}
