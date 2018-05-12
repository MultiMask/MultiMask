import messaging from "../message";

import {
  ACCOUNT_ACTIVE,
  ACCOUNT_BACK,
  ACCOUNT_BUY,
  ACCOUNT_INFO,
  ACCOUNT_SEND,
  ACCOUNT_SET
} from "./../../constants/account";

export default {
  getInfo: () => (dispatch, getState) => {
    messaging.send({
      type: ACCOUNT_INFO
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
