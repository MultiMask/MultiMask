import { push, goBack } from 'connected-react-router';

import InternalMessage from 'services/InternalMessage';

import {
  ACCOUNT_ACTIVE,
  ACCOUNT_CREATE,
  ACCOUNT_INFO,
  ACCOUNT_UPDATE,
  ACCOUNT_SET,
  ACCOUNT_GETSEED,
  ACCOUNT_GETSEED_RESULT,
  ACCOUNT_NETWORK_UPDATE
} from 'constants/account';

const AccountActions = {
  getInfo: () => (dispatch, getState) => {
    return InternalMessage.signal(ACCOUNT_INFO)
      .send()
      .then(payload => {
        AccountActions.setAccount(payload)(dispatch, getState);
      });
  },

  create: account => (dispatch, getState) => {
    InternalMessage.payload(ACCOUNT_CREATE, account)
      .send()
      .then(payload => {
        AccountActions.setAccount(payload)(dispatch, getState);

        dispatch(goBack());
      });
  },

  changeNetwork: (id, network) => (dispatch, getState) => {
    InternalMessage.payload(ACCOUNT_NETWORK_UPDATE, { id, network })
      .send()
      .then(payload => {
        AccountActions.setAccount(payload)(dispatch, getState);

        dispatch(goBack());
      });
  },

  setAccount: accs => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_SET,
      payload: accs
    });
  },

  updateAccount: account => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_UPDATE,
      payload: account
    });
  },

  setActive: name => (dispatch, getState) => {
    const action = {
      type: ACCOUNT_ACTIVE,
      payload: name
    };

    dispatch(action);

    dispatch(push('/account/details'));
  },

  getSeed: (pass, id) => (dispatch, getState) => {
    InternalMessage.payload(ACCOUNT_GETSEED, id)
      .send()
      .then(seed => {
        dispatch({
          type: ACCOUNT_GETSEED_RESULT,
          payload: { seed }
        });
      });
  }
};
export default AccountActions;
