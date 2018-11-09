import { push, goBack } from 'connected-react-router';
import {
  GET_KEY_ACCOUNTS,
  SET_ACCOUNT_TO_KEY
} from 'constants/blockchains/eos';
import InternalMessage from 'services/InternalMessage';

import accountActions from './account';

export const eosActions = {
  getKeyAccounts: (id: string) => (dispatch, getState) => {
    return InternalMessage.payload(GET_KEY_ACCOUNTS, id)
      .send();
  },

  setAccountToKey: (id: string, accountPermission) => (dispatch, getState) => {
    return InternalMessage.payload(SET_ACCOUNT_TO_KEY, {id, accountPermission})
      .send()
      .then(account => {
        accountActions.updateAccount(account)(dispatch, getState);
        dispatch(goBack());
      })
  }
};
