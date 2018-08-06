import React from 'react';
import { format } from 'date-fns';
import web3 from 'web3';

const DATE_FORMAT = 'D MMMM YYYY HH:mm';

export default class BitcoinTXS extends React.Component {
  get txs() {
    const { account } = this.props;
    // console.log("btc out", account.info.txs);

    return account.info.txs.map(tx => {
      return (
        <div className="tx" key={tx.hash}>
          <div className="tx_date">{format(tx.timeStamp * 1000, DATE_FORMAT)}</div>
          <div className="tx_amount">
            <span className="tx_amount_title">Amount:</span>
            <span className="tx_amount_value">{web3.utils.fromWei(tx.value, 'ether')}</span>
            <span>BTC</span>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.txs}</div>;
  }
}
