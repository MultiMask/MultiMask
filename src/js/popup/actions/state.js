import messaging from "../message";

import {
  STATE_CREATE,
  STATE_MAIN
} from "./../../constants/state";

const StateActions ={
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
};
export default StateActions;
