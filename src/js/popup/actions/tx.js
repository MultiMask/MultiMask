import messaging from '../message';

import { TX_CREATE } from './../../constants/tx';

const StateActions = {
  createTx: ({ id, tx }) => (dispatch, getState) => {
    messaging.send({
      type: TX_CREATE,
      payload: {
        id,
        tx
      }
    });
  }
};
export default StateActions;
