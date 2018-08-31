// import txCtrl from './../../models/providers/tx';

import { TX_APPROVE, TX_APPROVE_RESULT, TX_SEND, TX_PAYMENT_GET, TX_PAYMENT_RESULT } from './../../constants/tx';

export default ({ App }) => ({ type, payload }, sendResponse) => {
  switch (type) {
    // Create TX from UI
    case TX_SEND: {
      const { id, tx } = payload;
      App.io.tx.sendTX({ id, tx });
      break;
    }

    case TX_APPROVE: {
      // txCtrl.approveTx(payload);

      break;
    }

    case TX_APPROVE_RESULT: {
      const { id, tx } = payload;
      // txCtrl.confirm(id, tx);
      sendResponse({});

      break;
    }

    case TX_PAYMENT_GET: {
      sendResponse({
        type: TX_PAYMENT_RESULT,
        // payload: txCtrl.getLast().toJSON()
      });

      break;
    }
  }
};
