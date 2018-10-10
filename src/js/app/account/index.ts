import uuid from 'uuid/v4';
import { info } from 'loglevel';
import { BCSign } from 'bcnetwork';

export default class Account {
  private secret: any;
  
  public wallet: any;
  
  public blockchain: BCSign;
  public id: string;
  public name: string;
  public extra: any;

  constructor ({ wallet, blockchain, name, extra, secret = { seed: null }, id = uuid() }) {
    this.name = name ? name : this._createName();
    
    this.blockchain = blockchain;
    this.id = id;
    this.secret = secret;
    this.extra = extra;
    
    this.wallet = wallet;
    if (this.extra && this.wallet.setExtra) {
      this.wallet.setExtra(this.extra);
    }
  }
  
  private _create (seed) {
    return this.wallet.create(seed);
  }
  
  private _createName () {
    return Date.now();
  }

  public init (): Promise<Account> {
    return this._create(this.secret.seed)
      .then(seed => {
        this.secret.seed = seed; 
        
        return this;
      });
  }
 
  public getSeed () {
    return this.secret.seed;
  }

  public getAddress () {
    return this.wallet.getAddress();
  }

  /**
   * Return info about this wallet wrapped into Promise
   */
  public getInfo (): Promise<WalletInfo> {
    return this.wallet.getInfo().then(info => ({
      id: this.id,
      name: this.name,
      blockchain: this.blockchain,
      extra: this.extra,
      info
    }));
  }

  public changeNetwork (network: string) {
    this.wallet.changeNetwork(network, this.secret.seed)
  }

  public sendTX (tx) {
    info('Sending tx > ', this.blockchain, this.name, tx);
    return this.wallet.sendCoins(tx);
  }

  public setExtra (data) {
    this.extra = data;

    if (this.wallet.setExtra) {
      this.wallet.setExtra(data);
    }
  }

  public serialize () {
    return {
      id: this.id,
      name: this.name,
      blockchain: this.blockchain,
      extra: this.extra,

      secret: {
        seed: this.secret.seed
      }
    };
  }
}
