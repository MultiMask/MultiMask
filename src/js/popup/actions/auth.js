import messaging from '../message';
import {hidePass} from './../../libs/cipher';

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

import StateActions from './state';
import AccountActions from './account';

const AuthActions = {
  init: pass => (dispatch, getState) => {
    const hiddenPass = hidePass(pass);

    messaging.send({
      type: AUTH_INIT,
      payload: {
        pass: hiddenPass
      }
    });
  },
  check: () => (dispatch, getState) => {
    messaging.send({
      type: AUTH_CHECK
    });
  },
  checkSuccess: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_CHECK_SUCCESS
    });

    AuthActions.success()(dispatch, getState);
  },
  checkFail: hasPass => (dispatch, getState) => {
    dispatch({
      type: AUTH_CHECK_FAIL,
      payload: {
        hasPass
      }
    });

    if (hasPass) {
      dispatch({
        type: STATE_LOGIN
      });
    } else {
      dispatch({
        type: STATE_INIT
      });
    }
  },
  login: pass => (dispatch, getState) => {
    const hiddenPass = hidePass(pass);

    messaging.send({
      type: AUTH_LOGIN,
      payload: {
        pass: hiddenPass
      }
    });
  },
  logout: () => (dispatch, getState) => {
    messaging.send({
      type: AUTH_LOGOUT
    });
  },
  logoutSucces: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGOUT_SUCCESS
    });

    dispatch({
      type: STATE_LOGIN
    });
  },
  logoutFail: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGOUT_FAIL
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
