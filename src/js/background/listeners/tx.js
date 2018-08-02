import createWindow from '../../libs/txWindow';

import { TX_CREATE, TX_PAYMENT, TX_PAYMENT_GET, TX_PAYMENT_RESULT } from './../../constants/tx';

let tx = null;

export default ({ App }) => ({ type, payload }, sendResponse) => {
  switch (type) {
    // Create TX from UI
    case TX_CREATE: {
      const { id, tx } = payload;
      App.io.tx.sendTX({ id, tx });
      break;
    }
  }

  // Payment Create TX
  // messaging.on(TX_PAYMENT, data => {
  //   tx = data;
  //   createWindow({});
  // });

  // Return TX into popup to payment
  // messaging.on(TX_PAYMENT_GET, data => {
  //   messaging.send({
  //     type: TX_PAYMENT_RESULT,
  //     payload: tx
  //   });
  // });
};
