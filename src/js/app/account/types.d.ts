type BCType = 'BTC' | 'ETH' | 'EOS';

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
 * Props Wallet with info about balances
 */
type WalletInfo = {
  blockchain: BCType;
  id: string;
  name: string;
  extra?: any;
  info: BCInfo;
}

/**
 * Common interface for all blockchain wallets
 */
interface IWallet {
  
  // TODO: set pk in Buffer
  changeNetwork (network: string, pk?: any): void;
  
  // TODO: set pk in Buffer
  create (pk: any): Promise<any>;
  
  getAddress (): string;
  getInfo (): Promise<BCInfo>;
  
  sendCoins({ to, amount, data }): Promise<any>;
}

/**
 * Options to create Account instance
 */
interface IAccountFactory {
  bc?: string;
  network?: string;
  data?: string;
  key?: string;
  name?: string;
  extra?: any;
  segwit?: boolean;
}

interface IAccountCreate extends IAccountFactory {
  wallet?: IWallet;
}
