import { push, goBack } from 'connected-react-router';
import { GET_KEY_ACCOUNTS, SET_ACCOUNT_TO_KEY } from 'constants/blockchains/eos';
import InternalMessage from 'services/InternalMessage';

import accountActions from './account';

export const eosActions = {
  getKeyAccounts: (key: string) => (dispatch, getState) => {
    return InternalMessage.payload(GET_KEY_ACCOUNTS, { key }).send();
  },

  setAccountToKey: (key: string, accountPermission) => (dispatch, getState) => {
    return InternalMessage.payload(SET_ACCOUNT_TO_KEY, { key, accountPermission })
      .send()
      .then(account => {
        accountActions.updateAccount(account)(dispatch, getState);
        dispatch(goBack());
      });
  }
};
