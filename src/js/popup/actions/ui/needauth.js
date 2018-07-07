import messaging from "../../message";
import { hidePass } from './../../../libs/cipher';

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
    const hiddenPass = hidePass(pass);
    
    messaging.send({
      type: NEEDAUTH_CHECK,
      payload: { pass: hiddenPass }
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
