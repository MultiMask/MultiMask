import InternalMessage from '../../libs/InternalMessage';
import { hidePass } from './../../libs/cipher';
import { push, goBack } from 'connected-react-router';

import {
  ACCOUNT_ACTIVE,
  ACCOUNT_CREATE,
  ACCOUNT_INFO,
  ACCOUNT_SET,
  ACCOUNT_GETSEED,
  ACCOUNT_GETSEED_RESULT
} from './../../constants/account';

const AccountActions = {
  getInfo: () => (dispatch, getState) => {
    return InternalMessage.signal(ACCOUNT_INFO)
      .send()
      .then(({ payload }) => {
        AccountActions.setAccount(payload)(dispatch, getState);
      });
  },

  create: account => (dispatch, getState) => {
    InternalMessage.payload(ACCOUNT_CREATE, { account })
      .send()
      .then(({ payload }) => {
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

  setActive: name => (dispatch, getState) => {
    const action = {
      type: ACCOUNT_ACTIVE,
      payload: name
    };

    dispatch(action);

    dispatch(push('/account/details'));
  },

  getSeed: (pass, id) => (dispatch, getState) => {
    const hashPass = hidePass(pass);

    InternalMessage.payload(ACCOUNT_GETSEED, { hashPass, id })
      .send()
      .then(({ payload: { seed } }) => {
        dispatch({
          type: ACCOUNT_GETSEED_RESULT,
          payload: { seed }
        });
      });
  }
};
export default AccountActions;
