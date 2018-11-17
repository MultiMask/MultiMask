import InternalMessage from 'services/InternalMessage';

import { TX_SEND } from 'constants/tx';

const StateActions = {
  createTx: ({ key, tx }) => (dispatch, getState) => {
    return InternalMessage.payload(TX_SEND, { key, tx }).send();
  }
};
export default StateActions;
