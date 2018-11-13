import { info } from 'loglevel';
import { BCSign } from 'bcnetwork';

export default class Account {
  public wallet: any;
  
  public bc: BCSign;
  public network: string;
  
  public name: string;
  public extra: any;
  public data: string;

  constructor ({ wallet, bc, network, name, extra, data }) {
    this.name = name ? name : Date.now();
    
    this.bc = bc;
    this.network = network;
    this.extra = extra;
    this.data = data;

    this.wallet = wallet;
    if (this.extra && this.wallet.setExtra) {
      this.wallet.setExtra(this.extra);
    }
  }

  public init (privateKey): Promise<Account> {
    return this.wallet.create(privateKey);
  }
 
  /**
   * DEPRICATED
   */
  public getSeed () {
    // return this.secret.seed;
  }

  public getAddress () {
    return this.wallet.getAddress();
  }

  /**
   * Return info about this wallet wrapped into Promise
   */
  public getInfo (): Promise<WalletInfo> {
    return this.wallet.getInfo().then(info => ({
      name: this.name,
      blockchain: this.bc,
      extra: this.extra,
      info
    }));
  }

  public changeNetwork (network: string, privateKey) {
    this.network = network;
    this.wallet.changeNetwork(network, privateKey)
  }

  public sendTX (tx) {
    info('Sending tx > ', this.bc, this.name, tx);
    return this.wallet.sendCoins(tx);
  }

  public setExtra (data) {
    this.extra = data;

    if (this.wallet.setExtra) {
      this.wallet.setExtra(data);
    }
  }

  /**
   * DEPRICATED
   */
  // public serialize () {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     blockchain: this.blockchain,
  //     extra: this.extra,

  //     secret: {
  //       seed: this.secret.seed
  //     }
  //   };
  // }
}
