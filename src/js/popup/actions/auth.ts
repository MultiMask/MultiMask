import { push } from 'connected-react-router';
import InternalMessage from 'services/InternalMessage';

import {
  AUTH_INIT,
  AUTH_CHECK,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL
} from 'constants/auth';

import { StorageService } from 'services/StorageService';
import AccountActions from './account';
import SettingActions from './settings';

const AuthActions = {
  init: pass => (dispatch, getState) => {
    InternalMessage.payload(AUTH_INIT, { pass })
      .send()
      .then(() => {
        AuthActions.success()(dispatch, getState);
      });
  },

  check: () => (dispatch, getState) => {
    InternalMessage.signal(AUTH_CHECK)
      .send()
      .then(({ isAuth }) => {
        if (isAuth) {
          dispatch({
            type: AUTH_CHECK_SUCCESS
          });
          AuthActions.success()(dispatch, getState);
        } else {
          isPassExist(hasPass => {
            dispatch({
              type: AUTH_CHECK_FAIL,
              payload: {
                hasPass
              }
            });
            const next = hasPass ? '/login' : '/create/account';
            dispatch(push(next));
          });
        }
      });
  },

  login: pass => (dispatch, getState) => {
    InternalMessage.payload(AUTH_LOGIN, { pass })
      .send()
      .then(({ isLogin }) => {
        if (isLogin) {
          AuthActions.success()(dispatch, getState);
        } else {
          AuthActions.fail()(dispatch, getState);
        }
      });
  },

  logout: () => (dispatch, getState) => {
    InternalMessage.signal(AUTH_LOGOUT)
      .send()
      .then(({ payload: { isLogout } }) => {
        if (isLogout) {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS
          });
          dispatch(push('/login'));
        } else {
          dispatch({
            type: AUTH_LOGOUT_FAIL
          });
        }
      });
  },

  success: () => (dispatch, getState) => {
    AccountActions.getInfo()(dispatch, getState);
    SettingActions.getPrices()(dispatch, getState);

    const state: IPopup.AppState = getState();
    dispatch(push(state.router.url || '/'));
  },

  fail: () => (dispatch, getState) => {
    dispatch({
      type: AUTH_LOGIN_FAIL
    });
  }
};
export default AuthActions;

/**
 * Check that App initiated
 * @param cb 
 */
function isPassExist (cb) {
  StorageService.Pass.get().then(result => cb(!!result));
}
