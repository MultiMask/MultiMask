import { info } from 'loglevel';

const DEFAULT_DATA = '020';     // mean use profile seed and index 0

export default class Account {
  public wallet: any;
  
  public bc: string;
  public network: string;
  
  public name: string;
  public extra: any;
  public data: string;
  public key: string;

  constructor ({ bc, name, extra, key, wallet, network, data = '020'}: IAccountCreate) {
    this.name = name ? name : Date.now().toString();

    this.bc = bc;
    this.network = network;
    this.extra = extra;
    this.data = data;
    this.key = key;

    this.wallet = wallet;
    if (this.extra && this.wallet.setExtra) {
      this.wallet.setExtra(this.extra);
    }
  }

  /**
   * Create 
   * @param privateKey 
   */
  public init (privateKey): Promise<Account> {
    return this.wallet.create(privateKey, this.network)
      .then(() => this);
  }

  public changeNetwork (network: string, privateKey) {
    this.network = network;
    this.wallet.changeNetwork(network, privateKey)
  }

  public setExtra (data: any): void {
    this.extra = data;

    if (this.wallet.setExtra) {
      this.wallet.setExtra(data);
    }
  }

  /**
   * Send transaction with params to pay
   * @param tx 
   */
  public sendTX (tx): Promise<any> {
    info('Sending tx > ', this.bc, this.name, tx);
    return this.wallet.sendCoins(tx);
  }

  public getAddress (): string {
    return this.wallet.getAddress();
  }

  /**
   * Return info about this wallet wrapped into Promise
   */
  public getInfo (): Promise<WalletInfo> {
    return this.wallet.getInfo().then(info => ({
      key: this.key,
      name: this.name,
      blockchain: this.bc,
      extra: this.extra,
      info
    }));
  }
}
