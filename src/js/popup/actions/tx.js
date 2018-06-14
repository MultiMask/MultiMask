import messaging from "../message";

import {
  TX_CREATE
} from "./../../constants/tx";

const StateActions = {
  createTx: tx => (dispatch, getState) => {
    const { account } = getState();

    messaging.send({
      type: TX_CREATE,
      payload: {
        name: account.wallet,
        tx
      }
    })
  }
};
export default StateActions;
