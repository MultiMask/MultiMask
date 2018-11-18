import networks from '../blockchain';
import { IWalletInfo } from 'types/accounts';

export enum LinkTypes {
  TX = 'tx',
  Address = 'address'
}

export const getExplorerLink = (account: IWalletInfo, hash: string, linkType: LinkTypes): string => {
  return `${getBaseExplorerUrl(account)}${linkType}/${hash}`;
};

export const openUrlToTab = (account: IWalletInfo, hash: string, linkType: LinkTypes) => {
  const url = getExplorerLink(account, hash, linkType);
  chrome.tabs.create({ url });
};

const getBaseExplorerUrl = ({ blockchain, info: { network: sign } }: IWalletInfo): string => {
  // TODO: fix blockchain type conflic
  return networks[blockchain as string].network.find(item => item.sign === sign).explorerUrl;
};
