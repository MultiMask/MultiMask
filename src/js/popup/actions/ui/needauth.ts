import InternalMessage from '../../../libs/InternalMessage';
import { hidePass } from './../../../libs/cipher';

import { NEEDAUTH_START, NEEDAUTH_CHECK, NEEDAUTH_SUCCESS, NEEDAUTH_FAIL } from './../../../constants/ui/needauth';

const NeedAuthActions = {
  start: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_START
    });
  },

  check: pass => (dispatch, getState) => {
    const hashPass = hidePass(pass);

    InternalMessage.payload(NEEDAUTH_CHECK, { hashPass })
      .send()
      .then(({ payload: { isAuth } }) => {
        if (isAuth) {
          dispatch({
            type: NEEDAUTH_SUCCESS
          });
        } else {
          dispatch({
            type: NEEDAUTH_FAIL,
            payload: {
              error: 'Wrong password'
            }
          });
        }
      });
  }
};

export default NeedAuthActions;
