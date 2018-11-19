import { BIP32 } from "bip32";
import { BCSign } from 'bcnetwork'

/**
 * Props Wallet with info about balances
 */
export interface IWalletInfo {
  network?: INetwork;
  blockchain: BCSign;
  key: string;
  name: string;
  extra?: any;
  info: BCInfo;
}

/**
 * Common interface for all blockchain wallets
 */
export interface IWallet {
  
  changeNetwork (network: INetwork): void;
  
  create (pk: BIP32): Promise<any>;
  
  getAddress (): string;
  getInfo (): Promise<BCInfo>;
  
  sendCoins ({ to, amount, data }): Promise<any>;
}

/**
 * Options to create Account instance
 */
export interface IAccountFactory {
  bc?: string;
  network?: INetwork;
  data?: string;
  key?: string;
  name?: string;
  extra?: any;
  segwit?: boolean;
}

export interface IAccountCreate extends IAccountFactory {
  wallet?: IWallet;
}

export interface INetwork {
  name: string;
  sign: string;
  url: string;
  btc?: any;
  chainId?: string;
}