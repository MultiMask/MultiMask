import InternalMessage from '../../libs/InternalMessage';

import { TX_CREATE } from './../../constants/tx';

const StateActions = {
  createTx: ({ id, tx }) => (dispatch, getState) => {
    return InternalMessage.payload(TX_CREATE, { id, tx }).send();
  }
};
export default StateActions;
