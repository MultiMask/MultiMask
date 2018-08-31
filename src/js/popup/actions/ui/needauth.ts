import { hidePass } from './../../../libs/cipher';
import { checkPass } from './../../../models/getter';

import { NEEDAUTH_START, NEEDAUTH_SUCCESS, NEEDAUTH_FAIL } from './../../../constants/ui/needauth';

const NeedAuthActions = {
  start: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_START
    });
  },

  check: pass => (dispatch, getState) => {
    const hashPass = hidePass(pass);

    checkPass(hashPass)
      .then(isAuth => {
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
