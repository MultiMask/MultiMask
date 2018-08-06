import React from 'react';
import { format } from 'date-fns';

const DATE_FORMAT = 'D MMMM YYYY HH:mm';

export default class BitcoinTXS extends React.Component {
  findAmount({ out, addr }) {
    const output = out.find(oneOut => oneOut.addr === addr);
    if (output) {
      return output.value / 1e8;
    }
  }

  get txs() {
    const { account } = this.props;
    // console.log("btc out", account.info.txs);

    return account.info.txs.map(tx => {
      return (
        <div className="tx" key={tx.hash}>
          <div className="tx_date">{format(tx.time * 1000, DATE_FORMAT)}</div>
          <div className="tx_amount">
            <span className="tx_amount_title">Amount:</span>
            <span className="tx_amount_value">{this.findAmount({ out: tx.out, addr: account.info.address })}</span>
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
