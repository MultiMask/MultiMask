import InternalMessage from 'services/InternalMessage';

import { TX_SEND } from 'constants/tx';

const StateActions = {
  createTx: ({ id, tx }) => (dispatch, getState) => {
    return InternalMessage.payload(TX_SEND, { id, tx }).send();
  }
};
export default StateActions;
