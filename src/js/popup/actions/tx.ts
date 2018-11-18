import InternalMessage from 'services/InternalMessage';
import { TX_SEND } from 'constants/tx';
import { push } from 'connected-react-router';

const StateActions = {
  createTx: ({ key, tx }) => (dispatch, getState) => {
    dispatch(push(`/loading`));
    return InternalMessage.payload(TX_SEND, { key, tx })
      .send()
      .then(resolve => {
        dispatch(push(`/account/send/result/${resolve.txHash}`));
      })
      .catch(err => dispatch(push(`/account/send/result/`)));
  }
};
export default StateActions;
