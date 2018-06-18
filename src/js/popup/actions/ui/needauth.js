import messaging from "../../message";

import {
  NEEDAUTH_START,
  NEEDAUTH_CHECK,
  NEEDAUTH_SUCCESS,
  NEEDAUTH_FAIL,
} from './../../../constants/ui/needauth';

const NeedAuthActions = {
  start: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_START
    });
  },
  check: pass => (dispatch, getState) => {
    messaging.send({
      type: NEEDAUTH_CHECK,
      payload: { pass }
    })
  },
  success: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_SUCCESS
    })
  },
  fail: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_FAIL,
      payload: {
        error: "Wrong password"
      }
    })
  },
};

export default NeedAuthActions;
