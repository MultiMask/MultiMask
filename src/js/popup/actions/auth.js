import messaging from "../message";

import {
    AUTH_CHECK,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAIL,
    AUTH_LOGIN,
    AUTH_LOGIN_FAIL
} from "./../../constants/auth";

import StateActions from './state';
import AccountActions from './account';

 const AuthActions = {
  check: () => (dispatch, getState) => {
    messaging.send({
      type: AUTH_CHECK
    });
  },
  checkSuccess: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_CHECK_SUCCESS,
    });
  },
  checkFail: hasPass => (dispatch, getState) => {
    dispatch({
      type: AUTH_CHECK_FAIL,
      payload: {
        hasPass
      }
    });
  },
  login: pass => (dispatch, getState) => {
    messaging.send({
      type: AUTH_LOGIN,
      payload: {
        pass
      }
    });
  },
  success: () => (dispatch, getState) => {
    StateActions.goMain()(dispatch, getState);
    AccountActions.getInfo()(dispatch, getState);
  },
  fail: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGIN_FAIL,
    });
  },
};
export default AuthActions;
