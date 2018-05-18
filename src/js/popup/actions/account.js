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

import stateActions from './state';

const AccountActions = {
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

    stateActions.goWallet(name)(dispatch, getState);
  },
  buy: () => (dispatch, getState) => {
    stateActions.goBy(name)(dispatch, getState);
  },
  send: () => (dispatch, getState) => {
    stateActions.goSend(name)(dispatch, getState);
  }
};
export default AccountActions;