import uuid from 'uuid/v4';
import { ACCOUNT_INFO_DOMAIN } from '../constants/account';
import networks from '../blockchain/index';
import BTC from './plugins/btcPlugin';
import Eth from './plugins/ethPlugin';
import EOS from './plugins/eosPlugin';

import { NetworkMessage } from 'models/NetworkMessage';
import { DanglingResolver } from 'models/DanglingResolver';

import { CONTENT_APP } from 'constants/apps';
import TransportLocator from './plugins/TransportLocator';
import { ISenderParams, IIdentityProps } from 'types/crypto3';
import { IWalletInfo } from 'types/accounts';

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
export const _send = (type: string, payload?: any) => {
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

  constructor(_stream) {
    stream = _stream;

    resolvers = [];
    _subscribe();

    this.btc = BTC(_send);
    this.eth = Eth(_send);
    this.eos = EOS(_send);
  }

  public async getIdentity(entity: IIdentityProps): Promise<ISenderParams | Error> {
    const entityNetwork = this.getEntityNetwork(entity);

    if (!entityNetwork) {
      return Error(`MultiMask don't support chainId ${entity.chainId} of ${entity.blockchain}`);
    }

    const response = (await _send(ACCOUNT_INFO_DOMAIN)) as { success: boolean; payload: { accounts: IWalletInfo[] } };

    if (!response.success) {
      return Error('Not found allowed accounts for this site ');
    }

    const { accounts } = response.payload;
    const account = accounts.find(
      item =>
        item.blockchain === entity.blockchain &&
        item.info.balance >= entity.amount &&
        entityNetwork.sign === item.info.network
    );

    if (account) {
      return {
        to: entity.address,
        from: account.info.address,
        amount: entity.amount,
        blockchainType: account.blockchain,
        chainId: entity.chainId
      };
    }

    return Error('not found account for payment');
  }

  public async pay(params): Promise<string | Error> {
    const sender = TransportLocator.create(params);

    if (sender === Error) {
      return sender;
    }

    const result = await sender.send();
    console.log('txhash', result);

    return result;
  }

  private getEntityNetwork(entity) {
    return networks[entity.blockchain].network.find(item => item.chainId === entity.chainId);
  }
}
