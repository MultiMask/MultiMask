import messaging from "../message";

import {
  TX_CREATE
} from "./../../constants/tx";

const StateActions = {
  createTx: tx => (dispatch, getState) => {
    messaging.send({
      type: TX_CREATE,
      payload: {
        tx
      }
    })
  }
};
export default StateActions;
