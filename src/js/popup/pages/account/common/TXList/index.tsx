import * as React from 'react';
import ntx from 'bcnetwork';

import BTC from './btc';
import ETH from './eth';

interface IProps {
  account: WalletInfo;
}

const TXList: React.SFC<IProps> = ({
  account: {
    info: { txs, address },
    blockchain
  }
}) => {
  switch (blockchain) {
    case ntx.BTC.sign: {
      return <BTC txs={txs} address={address} />;
    }
    case ntx.ETH.sign: {
      return <ETH txs={txs} address={address} />;
    }
    default:
      return null;
  }
};

export default TXList;
