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
  create({ name, blockchain, network, id, secret }) {
    let wallet = createWallet({ blockchain, network });

    return new Account({ wallet, name, network, blockchain, secret, id });
  },

  save(pass, account) {
    log.debug('save account > ', pass, account);
    const id = account.id;
    const str = JSON.stringify(account.serialize());
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

      return this.create(decoded);
    });
  },

  loadListByIds(pass, ids) {
    return Promise.all(ids.map(id => this.load(pass, id)));
  }
};
