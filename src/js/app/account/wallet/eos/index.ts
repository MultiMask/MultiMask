import Eos from 'eosjs';
const {ecc, Fcbuffer} = Eos.modules;

import {prettyAccount, IEosAccountPermission} from 'helpers/eos';
import ntx from 'bcnetwork';

const findNetwork = name => ntx.EOS.network.find(net => net.name === name);

export class EosWallet implements IWallet {
  private eos;
  private network;

  private public: string;
  private private: string;

  public accountPermission: IEosAccountPermission;

  constructor (network) {
    this.network = network;
  }

  public changeNetwork (network: string, seed: string): void {
    const net = findNetwork(network);

    if (net) {
      this.eos = Eos({
        keyProvider: seed,
        httpEndpoint: net.url,
        chainId: net.chainId,
      });
    }
  }

  public create (_private) {
    const promise = _private
      ? Promise.resolve(_private)
      : ecc.randomKey();

    return promise
      .then(key => {
        this.private = key;

        this.eos = Eos({
          keyProvider: this.private,
          httpEndpoint: this.network.url,
          chainId: this.network.chainId,
        });
        
        return ecc.privateToPublic(this.private);
      })
      .then(_public => {
        this.public = _public;

        return this.private;
      });
  }

  public getKeyAccounts () {
    return this.eos.getKeyAccounts({ public_key: this.public})
      .then(({account_names}) => {
        return Promise.all(account_names.map(name => this._getInfoByAccount(name)));
      })
  }

  private _getInfoByAccount (accountName: string) {
    return this.eos.getAccount(accountName);
  }

  public getInfo (): Promise<any> {
    if (this.accountPermission) {
      return this._getInfoByAccount(this.accountPermission.account_name).then(accountInfo => {
        return {
          address: prettyAccount(this.accountPermission),
          balance: accountInfo.core_liquid_balance.split(' ')[0],
          network: this.network.sign,
          txs: []
        }
      })
    } else {
      return Promise.resolve({
        address: this.public,
        balance: 0,
        network: this.network.sign,
        txs: []
      })
    }
  }

  public getAddress () {
    return this.accountPermission.account_name;
  }

  public setExtra (data: IEosAccountPermission) {
    if (data && data.account_name) {
      this.accountPermission = data;
    }
  }

  public sendCoins ({ to, amount, data, token = 'EOS' }) {
    return this.eos.transfer(this.accountPermission.account_name, to, `${amount.toFixed(4)} ${token}`, data);
  }
}
