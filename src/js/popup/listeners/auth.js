import messaging from '../message';

import authAction from '../actions/auth';

import { AUTH_CHECK_SUCCESS, AUTH_CHECK_FAIL, AUTH_LOGIN_RESULT, AUTH_LOGOUT_SUCCESS } from '../../constants/auth';

import { getPass } from './../../models/getter';

export default function({ dispatch, getState }) {
  messaging.on(AUTH_LOGIN_RESULT, ({ login }) => {
    if (login) {
      authAction.success()(dispatch, getState);
    } else {
      authAction.fail()(dispatch, getState);
    }
  });

  messaging.on(AUTH_LOGOUT_SUCCESS, () => {
    authAction.logoutSucces()(dispatch, getState);
  });

  messaging.on(AUTH_CHECK_SUCCESS, () => {
    authAction.checkSuccess()(dispatch, getState);
  });

  messaging.on(AUTH_CHECK_FAIL, data => {
    checkPass(hasHash => {
      authAction.checkFail(hasHash)(dispatch, getState);
    });
  });
}

function checkPass(cb) {
  getPass().then(result => cb(!!result));
}
