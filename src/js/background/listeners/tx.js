import createWindow from '../../libs/txWindow';

import { TX_CREATE, TX_PAYMENT, TX_PAYMENT_GET, TX_PAYMENT_RESULT } from './../../constants/tx';

let tx = null;

export default ({ messaging, App }) => {
  // Create TX from UI
  messaging.on(TX_CREATE, ({ name, tx }) => {
    const account = App.accountManager.getAccount(name);
    account.sendTX(tx);
  });

  // Payment Create TX
  messaging.on(TX_PAYMENT, data => {
    tx = data;
    createWindow({});
  });

  // Return TX into popup to payment
  messaging.on(TX_PAYMENT_GET, data => {
    messaging.send({
      type: TX_PAYMENT_RESULT,
      payload: tx
    });
  });
};
