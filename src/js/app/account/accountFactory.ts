import { getEntity, setEntity, removeEntity } from '../../models/getter';
import { encode, decode } from '../../libs/cipher';
import networks from '../../blockchain';
import { debug } from 'loglevel';

import Account from '.';
import BitcoinWallet from './wallet/bitcoin';
import EthWallet from './wallet/eth';
import { EosWallet } from './wallet/eos';

const createWallet = ({ blockchain, network = {}}: any) => {
  if (blockchain === networks.BTC.sign) {
    return new BitcoinWallet(network.sign);
  }

  if (blockchain === networks.ETH.sign) {
    return new EthWallet(network.sign);
  }

  if (blockchain === networks.EOS.sign) {
    return new EosWallet(network);
  }

  throw new Error(`No support blockchain ${network}`);
};

export default {
  create({ name, blockchain, network, id, secret }: any): Account {
    const wallet = createWallet({ blockchain, network });

    return new Account({ wallet, name, network, blockchain, secret, id });
  },

  save(pass, account): void {
    debug('save account > ', pass, account);
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
