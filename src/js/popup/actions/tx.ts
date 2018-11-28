import InternalMessage from 'services/InternalMessage';
import { TX_SEND } from 'constants/tx';
import { push } from 'connected-react-router';

import { URL_ACCOUNT_SEND_RESULT } from 'constants/popupUrl';

const StateActions = {
  createTx: ({ key, tx }) => (dispatch, getState) => {
    dispatch(push(`/loading`));
    return InternalMessage.payload(TX_SEND, { key, tx })
      .send()
      .then(resolve => {
        dispatch(push(`${URL_ACCOUNT_SEND_RESULT}/${resolve.txHash}`));
      })
      .catch(err => dispatch(push(URL_ACCOUNT_SEND_RESULT)));
  }
};
export default StateActions;
