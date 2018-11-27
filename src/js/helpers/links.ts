import { getBcNet } from 'bcnetwork';
import { IWalletInfo } from 'types/accounts';

export enum LinkTypes {
  TX = 'tx',
  Address = 'address',
  Account = 'account'
}

export const getExplorerLink = (account: IWalletInfo, hash: string, linkType: LinkTypes): string => {
  return `${getBaseExplorerUrl(account)}${linkType}/${hash}`;
};

export const openUrlToTab = (account: IWalletInfo, hash: string, linkType: LinkTypes) => {
  const url = getExplorerLink(account, hash, linkType);
  chrome.tabs.create({ url });
};

const getBaseExplorerUrl = ({ blockchain, info: { network: sign } }: IWalletInfo): string => {
  return getBcNet(blockchain, sign).explorerUrl;
};
