import ntx from 'bcnetwork';

import { BTC_APPROVE, BTC_GET_ACCOUNTS } from 'constants/blockchains/btc';

let messageSender;

export default _sender => {
  messageSender = _sender;

  return {
    getAccounts: () => {
      return messageSender(BTC_GET_ACCOUNTS);
    },

    send: tx => {
      return messageSender(BTC_APPROVE, {
        blockchain: ntx.BTC.sign,
        tx
      });
    }
  };
};
