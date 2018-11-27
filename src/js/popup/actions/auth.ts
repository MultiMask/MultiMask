import { info } from 'loglevel';
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

import { URL_MAIN, URL_LOGIN, URL_INTRODUCTION } from 'constants/popupUrl';

import { StorageService } from 'services/StorageService';
import AccountActions from './account';
import SettingActions from './settings';
import ProfileActions from './profile';

const AuthActions = {
  init: pass => (dispatch, getState) => {
    return InternalMessage.payload(AUTH_INIT, { pass })
      .send()
      .then(() => {
        AuthActions.success()(dispatch, getState);
      });
  },

  check: () => (dispatch, getState) => {
    return InternalMessage.signal(AUTH_CHECK)
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
            const next = hasPass ? URL_LOGIN : '/create/account';
            dispatch(push(next));
          });
        }
      });
  },

  login: pass => (dispatch, getState) => {
    return InternalMessage.payload(AUTH_LOGIN, { pass })
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
    return InternalMessage.signal(AUTH_LOGOUT)
      .send()
      .then(({ payload: { isLogout } }) => {
        if (isLogout) {
          dispatch({
            type: AUTH_LOGOUT_SUCCESS
          });
          dispatch(push(URL_LOGIN));
        } else {
          dispatch({
            type: AUTH_LOGOUT_FAIL
          });
        }
      });
  },

  success: () => async (dispatch, getState) => {
    const { success, payload } = await ProfileActions.getCurrentProfile()(dispatch, getState);

    // No profile: new user
    if (!success) {
      info('No profile');
      return dispatch(push(URL_INTRODUCTION));
    }

    const { profileId } = payload;
    AuthActions.entrance(profileId)(dispatch, getState);
  },

  entrance: (profileId, forceRedirect = false) => async (dispatch, getState) => {
    const { success: activate } = await ProfileActions.select(profileId)(dispatch, getState);

    // Error with profile: create new
    if (!activate) {
      info('Fail on activate profile', profileId);
      return dispatch(push(URL_INTRODUCTION));
    }

    Promise.all([AccountActions.getInfo()(dispatch, getState), SettingActions.getPrices()(dispatch, getState)]).then(
      () => {
        const state: IPopup.AppState = getState();
        const url = forceRedirect ? URL_MAIN : state && state.router && state.router.url ? state.router.url : URL_MAIN;

        info('Restore url > ', url);
        dispatch(push(url));
      }
    );
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
