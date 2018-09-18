/**
 * Blockchain info to show in UI
 */
type BCInfo = {
  address: string;
  balance: number;
  network: string;
  txs?: any[];
}

/**
 * Common interface for all blockchain wallets
 */
interface IWallet {
  
  changeNetwork (network: string, seed?: string): void;
  
  create (seed: string): Promise<string>;
  
  getAddress (): string;
  getInfo (): Promise<BCInfo>;
  
  sendCoins({ to, amount, data }): Promise<any>;
}