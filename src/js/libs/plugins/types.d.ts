export interface ISender {
  to: string;
  from: string;
  data?: string;
  amount: number;
  send<T>();
}

export interface ISenderParams {
  from: string;
  to: string;
  amount: number;
  data?: string;
  blockchainType: BCType;
}

export interface IIdentityProps {
  address: string;
  blockchain: BCType;
  chainId: number | string;
  amount: number;
}
