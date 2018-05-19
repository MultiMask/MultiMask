import createWindow from "../../libs/txWindow";

import {
  TX_CREATE
} from './../../constants/tx';

const txs = [];

export default ({ messaging, App }) => {

  // Create TX from UI
  messaging.on(TX_CREATE, ({ tx }) => {

    const newTx = {
      ...tx,
      id: txs.length,
    }
    txs.push(newTx);

    const account = App.getActiveAccount();

    console.log('account', account);
    console.log('newTx', newTx);
    account.sendTX(newTx);
  });

  // Show window with TX
  // messaging.on("tx_send", data => {
  //     tx.push({
  //         ...data,
  //         id: tx.length
  //     });

  //     createWindow({});
  // });

  // // Render TX in popup
  // messaging.on("payment_init", data => {
  //     messaging.send({
  //         type: "payment_tx",
  //         payload: tx[tx.length - 1]
  //     });
  // });

  // Render TX in popup
  // messaging.on("payment_submit", payload => {
  //     const { id } = payload;
  //     tx[id] = {
  //         ...tx[id],
  //         ...payload
  //     };
  //     wallet.createTX(tx[id]);
  // });
};
