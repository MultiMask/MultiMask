import messaging from "../message";

import {
  STATE_CREATE,
  STATE_MAIN,
  STATE_WALLET,
  STATE_BUY,
  STATE_SEND
} from "./../../constants/state";

const StateActions = {
  createWallet: () => (dispatch, getState) => {
    dispatch({
      type: STATE_CREATE
    })
  },
  goMain: () => (dispatch, getState) => {
    dispatch({
      type: STATE_MAIN
    })
  },
  goWallet: name => (dispatch, getState) => {
    dispatch({
      type: STATE_WALLET,
      payload: name
    })
  },
  goBy: () => (dispatch, getState) => {
    dispatch({
      type: STATE_BUY
    })
  },
  goSend:  () => (dispatch, getState) => {
    dispatch({
      type: STATE_SEND
    })
  },
};
export default StateActions;
