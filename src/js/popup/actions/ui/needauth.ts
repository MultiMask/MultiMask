import { hidePass } from 'libs/cipher';
import { StorageService } from 'services/StorageService';

import { NEEDAUTH_START, NEEDAUTH_SUCCESS, NEEDAUTH_FAIL } from 'constants/ui/needauth';

const NeedAuthActions = {
  start: () => (dispatch, getState) => {
    dispatch({
      type: NEEDAUTH_START
    });
  },

  check: pass => (dispatch, getState) => {
    const hashPass = hidePass(pass);

    StorageService.Pass.check(hashPass)
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
