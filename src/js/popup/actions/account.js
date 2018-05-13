import messaging from "../message";

import {
  ACCOUNT_ACTIVE,
  ACCOUNT_CREATE,
  ACCOUNT_BACK,
  ACCOUNT_BUY,
  ACCOUNT_INFO,
  ACCOUNT_SEND,
  ACCOUNT_SET
} from "./../../constants/account";

import {
  STATE_MAIN
} from "./../../constants/state";

export default {
  getInfo: () => (dispatch, getState) => {
    messaging.send({
      type: ACCOUNT_INFO
    });
  },
  create: account => (dispatch, getState) => {
    messaging.send({
      type: ACCOUNT_CREATE,
      payload: account
    });

    dispatch({
      type: STATE_MAIN,
    });
  },
  setAccount: accs => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_SET,
      payload: accs
    });
  },
  setActive: name => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_ACTIVE,
      payload: name
    });
  },
  buy: () => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_BUY
    });
  },
  send: () => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_SEND
    });
  },
  back: () => (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_BACK
    });
  }
};
