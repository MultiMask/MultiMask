import messaging from "../message";

import {
  STATE_CREATE
} from "./../../constants/state";

export default {
  createWallet: () => (dispatch, getState) => {
    dispatch({
      type: STATE_CREATE
    })
  },
};
