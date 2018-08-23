import InternalMessage from '../../libs/InternalMessage';
import { push } from 'connected-react-router';

import {
  AUTH_INIT,
  AUTH_CHECK,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL
} from './../../constants/auth';

import { getPass } from './../../models/getter';
import AccountActions from './account';
import SettingActions from './settings';

const AuthActions = {
  init: pass => (dispatch, getState) => {
    InternalMessage.payload(AUTH_INIT, { pass })
      .send()
      .then(() => {
        AuthActions.success()(dispatch, getState);
      });
  },

  check: () => (dispatch, getState) => {
    InternalMessage.signal(AUTH_CHECK)
      .send()
      .then(({ payload: { isAuth } }) => {
        if (isAuth) {
          dispatch({
            type: AUTH_CHECK_SUCCESS
          });
          AuthActions.success()(dispatch, getState);
        } else {
          checkPass(hasPass => {
            dispatch({
              type: AUTH_CHECK_FAIL,
              payload: {
                hasPass
              }
            });
            const next = hasPass ? '/login' : '/create/account';
            dispatch(push(next));
          });
        }
      });
  },

  login: pass => (dispatch, getState) => {
    InternalMessage.payload(AUTH_LOGIN, { pass })
      .send()
      .then(({ payload: { login } }) => {
        if (login) {
          AuthActions.success()(dispatch, getState);
        } else {
          AuthActions.fail()(dispatch, getState);
        }
      });
  },

  logout: () => (dispatch, getState) => {
    InternalMessage.signal(AUTH_LOGOUT)
      .send()
      .then(({ payload: { isLogout } }) => {
        if (isLogout) {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS
          });
        } else {
          dispatch({
            type: AUTH_LOGOUT_FAIL
          });
        }
      });
  },

  success: () => (dispatch, getState) => {
    AccountActions.getInfo()(dispatch, getState);
    SettingActions.getPrices()(dispatch, getState);
    dispatch(push('/'));
  },

  fail: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGIN_FAIL
    });
  }
};
export default AuthActions;

function checkPass(cb) {
  getPass().then(result => cb(!!result));
}
