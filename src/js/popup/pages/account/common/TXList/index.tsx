import * as React from 'react';
import { openUrlToTab, LinkTypes } from 'helpers/links';
import ntx, { BCSign } from 'bcnetwork';
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

  switch (blockchain) {
    case BCSign.LTC:
    case BCSign.DOGE:
    case BCSign.BTC:
      return <BTC txs={txs} address={account} linkToExplorer={linkToExplorer(account)} bc={blockchain} />;

    case BCSign.EOS:
      return <ETH txs={txs} address={address} linkToExplorer={linkToExplorer(account)} />;

    default:
      return null;
  }
};

export default TXList;
