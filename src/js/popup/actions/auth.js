import messaging from "../message";

import {
    AUTH_CHECK,
    AUTH_LOGIN
} from "./../../constants/auth";

import StateActions from './state';

export default {
  check: () => (dispatch, getState) => {
    messaging.send({
      type: AUTH_CHECK
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
  },
  fail: () => (dispatch, getState) => {
    console.log('fail login');
  },
};
