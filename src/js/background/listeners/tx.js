import uuid from 'uuid/v4';
import createWindow from '../../libs/txWindow';

import { TX_APPROVE, TX_SEND, TX_PAYMENT_GET, TX_PAYMENT_RESULT } from './../../constants/tx';

let tx = [];

export default ({ App }) => ({ type, payload }, sendResponse) => {
  switch (type) {
    // Create TX from UI
    case TX_SEND: {
      const { id, tx } = payload;
      App.io.tx.sendTX({ id, tx });
      break;
    }

    case TX_APPROVE: {
      tx.push({
        ...payload,
        id: uuid()
      });
      createWindow({});

      break;
    }

    case TX_PAYMENT_GET: {
      sendResponse({
        type: TX_PAYMENT_RESULT,
        payload: tx
      });

      break;
    }
  }
};
