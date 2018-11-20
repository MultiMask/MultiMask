import { BCSign } from 'bcnetwork';

export interface ISender {
  to: string;
  from: string;
  data?: string;
  amount: number;
  send<T> ();
}

export interface ISenderParams {
  from: string;
  to: string;
  amount: number;
  data?: string;
  blockchainType: BCSign;
  chainId: string | number;
}

export interface IIdentityProps {
  address: string;
  blockchain: BCSign;
  chainId: number | string;
  amount: number;
}
