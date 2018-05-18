import messaging from "../message";

import {
  STATE_CREATE,
  STATE_MAIN,
  STATE_WALLET
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
};
export default StateActions;
