import { debug } from 'loglevel';

import ntx from 'bcnetwork';
import { StorageService } from 'services/StorageService';

import Account from '.';
import BitcoinWallet from './wallet/btc';
import EthWallet from './wallet/eth';
import { EosWallet } from './wallet/eos';

const createWallet = ({ bc }) => {
  if (bc === ntx.BTC.sign) {
    const defaultBTCNetwork = ntx.BTC.network[0].sign;
    return new BitcoinWallet(defaultBTCNetwork);
  }

  if (bc === ntx.ETH.sign) {
    const defaultETHNetwork = ntx.ETH.network[0].sign;
    return new EthWallet(defaultETHNetwork);
  }

  if (bc === ntx.EOS.sign) {
    const defaultEOSNetwork = ntx.EOS.network[0];
    return new EosWallet(defaultEOSNetwork);
  }

  throw new Error(`No support blockchain: ${bc}`);
};

export class AccountFactory {
  public static create (opts) {
    const { bc } = opts;
    const wallet = createWallet({ bc });
    const network = ntx[bc].network[0].sign;

    return new Account({ ...opts, wallet, network });
  }

  // save (pass: string, account: Account): void {
  //   debug('save account > ', account);
  //   const id = account.id;
  //   const str = JSON.stringify(account.serialize());
  //   // eslint-disable-next-line
  //   const encodedWallet = encryptEntities ? encode(pass, str) : str;

  //   debug('Account Save > ', encodedWallet);

  //   StorageService.Entities.set(id, encodedWallet);
  // },

  // removeList (ids) {
  //   return Promise.all(ids.map(id => StorageService.Entities.remove(id)));
  // },

  // load (pass, id): Promise<Account> {
  //   return StorageService.Entities.get(id).then((str: string) => {
  //     debug('Account Load > raw >', str, id);
  //     // eslint-disable-next-line
  //     const decoded = encryptEntities ? JSON.parse(decode(pass, str)) : JSON.parse(str);

  //     debug('Account Load > ', decoded);

  //     return this.create(decoded).init();
  //   });
  // },

  // loadListByIds (pass, ids) {
  //   return Promise.all(ids.map(id => this.load(pass, id)));
  // },

  // loadListSerializedByIds (pass, ids) {
  //   return this.loadListByIds(pass, ids).then(result => {
  //     return result.map((account: any) => account.serialize());
  //   });
  // }
};
