import Eos from 'eosjs';
const {ecc, Fcbuffer} = Eos.modules;

export class EosWallet {
  private eos;
  private network;

  private public: string;
  private private: string;

  public account: string;

  constructor(network) {
    this.network = network;
  }

  public create(_private) {
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
        })
        
        return ecc.privateToPublic(this.private);
      })
      .then(_public => {
        this.public = _public;
        
        return this.private;
      });
  }

  public getKeyAccounts() {
    return this.eos.getKeyAccounts({ public_key: this.public})
      .then(({account_names}) => {
        return Promise.all(account_names.map(name => this._getInfoByAccount(name)));
      })
  }

  private _getInfoByAccount(accountName: string) {
    return this.eos.getAccount(accountName);
  }

  public getInfo() {
    return this._getInfoByAccount(this.account);
  }

  public setExtra(data) {
    if (data && data.account) {
      this.account = data.account;
    }
  }
}
