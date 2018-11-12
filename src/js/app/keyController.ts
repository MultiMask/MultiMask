/**
 * Store HD key in memory and devire key for wallets
 */
export class KeyController {
  private keys: IKeyStore = null;

  constructor () {
    
    this.startListening();
  }

  /** 
   * Listen message
   */
  private startListening () {
    
  }

  public assignKeys (keys: IKeyStore) {
    this.keys = keys;
  }
}
