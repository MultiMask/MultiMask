import messaging from "../message";

import {
  STATE_CREATE,
  STATE_MAIN,
  STATE_WALLET,
  STATE_BUY,
  STATE_SEND,
  STATE_EXPORTPK,

  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_EXPORTPK
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
  goBuy: () => (dispatch, getState) => {
    dispatch({
      type: STATE_BUY
    })
  },
  goSend: () => (dispatch, getState) => {
    dispatch({
      type: STATE_SEND
    })
  },
  goExportPK: () => (dispatch, getState) => {
    dispatch({
      type: STATE_EXPORTPK
    })
  },
  goBack: () => (dispatch, getState) => {
    const { state, account } = getState();
    const { view } = state;

    switch (view) {
      case STATE_VIEW_BUY:
      case STATE_VIEW_SEND:
      case STATE_VIEW_EXPORTPK:
        StateActions.goWallet(account.name)(dispatch, getState);
        break;
      default:
        StateActions.goMain()(dispatch, getState);
    }
  }
};
export default StateActions;
