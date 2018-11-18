import * as React from 'react';
import { openUrlToTab, LinkTypes } from 'helpers/links';
import ntx from 'bcnetwork';
import { IWalletInfo } from 'types/accounts';
import BTC from './btc';
import ETH from './eth';

interface IProps {
  account: IWalletInfo;
}

const TXList: React.SFC<IProps> = ({ account }) => {
  const linkToExplorer = wallet => hash => openUrlToTab(wallet, hash, LinkTypes.TX);
  const {
    blockchain,
    info: { address, txs }
  } = account;
  // TODO: make one tx item component
  switch (blockchain) {
    case ntx.BTC.sign: {
      return <BTC txs={txs} address={account} linkToExplorer={linkToExplorer(account)} />;
    }
    case ntx.ETH.sign: {
      return <ETH txs={txs} address={address} linkToExplorer={linkToExplorer(account)} />;
    }
    default:
      return null;
  }
};

export default TXList;
