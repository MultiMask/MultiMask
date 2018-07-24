import React from 'react';
import networks from './../../../../../blockchain';

import BTC from './btc';
import ETH from './eth';

const TXList = ({
  data: {
    info: { txs, address },
    blockchain
  }
}) => {
  switch (blockchain) {
    case networks.BTC.sign: {
      return <BTC txs={txs} address={address} />;
    }
    case networks.ETH.sign: {
      return <ETH txs={txs} address={address} />;
    }
    default:
      return null;
  }
};

export default TXList;
