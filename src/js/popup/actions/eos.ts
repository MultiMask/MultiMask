import { push, goBack } from 'connected-react-router';
import {
  GET_KEY_ACCOUNTS,
  SET_ACCOUNT_TO_KEY
} from 'constants/blockchains/eos';
import InternalMessage from 'services/InternalMessage';

import accountActions from './account';

const settingsActions = {
  getKeyAccounts: (id) => (dispatch, getState) => {
    return InternalMessage.payload(GET_KEY_ACCOUNTS, id)
      .send();
  },

  setAccountToKey: (id: string, accountName: string) => (dispatch, getState) => {
    return InternalMessage.payload(SET_ACCOUNT_TO_KEY, {id, accountName})
      .send()
      .then(account => {
        accountActions.updateAccount(account)(dispatch, getState);
        dispatch(goBack());
      })
  }
};

export default settingsActions;
