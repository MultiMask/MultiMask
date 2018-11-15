export interface ISender {
  to: string;
  from: string;
  data?: string;
  amount: number;
  send(): Promise<string | Error>;
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
  chainId: number;
  amount: number;
}
