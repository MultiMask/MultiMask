import Eos from 'eosjs';
const {ecc, Fcbuffer} = Eos.modules;

import networks from './../../../../blockchain';

const findNetwork = name => {
  return networks.EOS.network.find(net => net.name === name);
}

export class EosWallet implements IWallet {
  private eos;
  private network;

  private public: string;
  private private: string;

  public account: string;

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

  public getInfo () {
    return this._getInfoByAccount(this.account).then(accountInfo => {
      return {
        address: this.account,
        balance: accountInfo.core_liquid_balance.split(' ')[0],
        network: this.network.sign,
        txs: []
      }
    })
  }

  public getAddress () {
    return this.account;
  }

  public setExtra (data) {
    if (data && data.account) {
      this.account = data.account;
    }
  }

  public sendCoins ({ to, amount, data }) {
    return this.eos.transfer(this.account, to, `${amount.toFixed(4)} EOS`, data);
  }
}
