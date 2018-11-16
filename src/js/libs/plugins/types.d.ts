export interface ISender {
  to: string;
  from: string;
  data?: string;
  amount: number;
  chainId: number | string;
  send<T>();
}

export interface ISenderParams {
  from: string;
  to: string;
  amount: number;
  data?: string;
  blockchainType: BCType;
  chainId: number | string;
}

export interface IIdentityProps {
  address: string;
  blockchain: BCType;
  chainId: number | string;
  amount: number;
}
