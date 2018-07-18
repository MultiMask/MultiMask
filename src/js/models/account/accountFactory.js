import uuid from 'uuid/v4';
import { getEntity, setEntity, removeEntity } from '../getter';
import { encode, decode } from '../../libs/cipher';
import networks from '../../blockchain';
import log from 'loglevel';

import BitcoinWallet from './wallet/bitcoin';
import Account from '.';

const createWallet = ({ blockchain, network }) => {
  if (blockchain === networks.BTC.sign) {
    return new BitcoinWallet(network);
  }
};

export default {
  create({ blockchain, network, seed, wallet }) {
    let _wallet = createWallet({ blockchain, network });
    let _seed = seed ? seed : wallet ? wallet.seed : null;

    return new Account({ wallet: _wallet, network, blockchain, seed: _seed, id: uuid() });
  },

  restore({ name, wallet, blockchain, network, id }) {
    log.debug('Restore wallet >', name, blockchain, network);

    let walletInstance = createWallet({ blockchain, network });

    return new Account({
      wallet: walletInstance,
      seed: wallet.seed,
      name,
      blockchain,
      network,
      id
    });
  },

  save(pass, account) {
    log.debug('save account > ', pass, account);
    const id = account.id;
    const str = JSON.stringify(account);
    // eslint-disable-next-line
    const encodedWallet = encryptEntities ? encode(pass, str) : str;

    log.debug('Account Save > ', encodedWallet);

    setEntity(id, encodedWallet);
  },

  removeList(ids) {
    return Promise.all(ids.map(id => removeEntity(id)));
  },

  load(pass, id) {
    return getEntity(id).then(str => {
      log.debug('Account Load > raw >', str, id);
      // eslint-disable-next-line
      const decoded =  encryptEntities ? JSON.parse(decode(pass, str)) : JSON.parse(str);

      log.debug('Account Load > ', decoded);

      return this.restore(decoded);
    });
  },

  loadListByIds(pass, ids) {
    return Promise.all(ids.map(id => this.load(pass, id)));
  }
};
