import { getEntity, setEntity, removeEntity } from '../../models/getter';
import { encode, decode } from '../../libs/cipher';
import networks from '../../blockchain';
import { debug } from 'loglevel';

import Account from '.';
import BitcoinWallet from './wallet/bitcoin';
import EthWallet from './wallet/eth';
import { EosWallet } from './wallet/eos';

const createWallet = ({ blockchain }) => {
  if (blockchain === networks.BTC.sign) {
    const defaultBTCNetwork = networks.BTC.network[0].sign;
    return new BitcoinWallet(defaultBTCNetwork);
  }

  if (blockchain === networks.ETH.sign) {
    const defaultETHNetwork = networks.ETH.network[0].sign;
    return new EthWallet(defaultETHNetwork);
  }

  if (blockchain === networks.EOS.sign) {
    const defaultEOSNetwork = networks.EOS.network[0];
    return new EosWallet(defaultEOSNetwork);
  }

  throw new Error(`No support blockchain: ${blockchain}`);
};

export default {
  create(opts) {
    const { blockchain } = opts;
    const wallet = createWallet({ blockchain });

    return new Account({ ...opts, wallet });
  },

  save(pass, account): void {
    debug('save account > ', account);
    const id = account.id;
    const str = JSON.stringify(account.serialize());
    // eslint-disable-next-line
    const encodedWallet = encryptEntities ? encode(pass, str) : str;

    debug('Account Save > ', encodedWallet);

    setEntity(id, encodedWallet);
  },

  removeList(ids) {
    return Promise.all(ids.map(id => removeEntity(id)));
  },

  load(pass, id): Promise<Account> {
    return getEntity(id).then((str: string) => {
      debug('Account Load > raw >', str, id);
      // eslint-disable-next-line
      const decoded = encryptEntities ? JSON.parse(decode(pass, str)) : JSON.parse(str);

      debug('Account Load > ', decoded);

      return this.create(decoded).init();
    });
  },

  loadListByIds(pass, ids) {
    return Promise.all(ids.map(id => this.load(pass, id)));
  },

  loadListSerializedByIds(pass, ids) {
    return this.loadListByIds(pass, ids).then(result => {
      return result.map((account: any) => account.serialize());
    });
  }
};
