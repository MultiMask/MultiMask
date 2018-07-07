import React from 'react';

import networks from './../../../../blockchain';
import Bitcoin from './bitcoin';

export default class TXS extends React.Component {
  get txComponent() {
    const { account } = this.props;
    switch (account.blockchain) {
      case networks.BTC.sign: {
        return <Bitcoin account={account} />;
      }
    }
    return null;
  }

  render() {
    return this.txComponent;
  }
}
