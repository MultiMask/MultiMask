import Eos from 'eosjs';
const {ecc, Fcbuffer} = Eos.modules;

export class EosWallet {
  private network;

  private public: string;
  private private: string;

  constructor({ network }) {
    this.network = network;
  }

  public create(_private) {
    const promise = _private
      ? Promise.resolve(_private)
      : ecc.randomKey();

    return promise
      .then(key => {
        this.private = key;
        
        return ecc.privateToPublic(this.private);
      })
      .then(_public => {
        this.public = _public;
        
        return this.private;
      });
  }

  public getKeyAccounts() {
    // return eos.getKeyAccounts({ public_key: this.public});
  }

  public getInfo() {
    return new Promise((res, rej) => {
      return {

      }
    });
  }
}
