import InternalMessage from '../../libs/InternalMessage';

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

import { STATE_INIT, STATE_LOGIN } from './../../constants/state';
import { getPass } from './../../models/getter';

import StateActions from './state';
import AccountActions from './account';

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

            dispatch({
              type: hasPass ? STATE_LOGIN : STATE_INIT
            });
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

          dispatch({
            type: STATE_LOGIN
          });
        } else {
          dispatch({
            type: AUTH_LOGOUT_FAIL
          });
        }
      });
  },

  success: () => (dispatch, getState) => {
    StateActions.goMain()(dispatch, getState);
    AccountActions.getInfo()(dispatch, getState);
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
