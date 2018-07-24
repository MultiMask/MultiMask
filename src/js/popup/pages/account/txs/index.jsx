import React from 'C:/Users/merq/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react';

import networks from '../../../../blockchain';
import Bitcoin from './bitcoin';
import Eth from './eth';

export default class TXS extends React.Component {
  get txComponent() {
    const { account } = this.props;
    switch (account.blockchain) {
      case networks.BTC.sign: {
        return <Bitcoin account={account} />;
      }
      case networks.ETH.sign: {
        return <Eth account={account} />;
      }
      default:
        return null;
    }
  }

  render() {
    return this.txComponent;
  }
}
