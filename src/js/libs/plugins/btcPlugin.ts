import ntx from 'bcnetwork';

import { TX_APPROVE } from 'constants/tx';

let messageSender;

export default _sender => {
  messageSender = _sender;

  return {
    send: ({
      to,
      amount,
      data
    }) => {
      messageSender(TX_APPROVE, {
        blockchain: ntx.BTC.sign,
        tx: {
          to,
          amount,
          data
        }
      });
    }
  }
}