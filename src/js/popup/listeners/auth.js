import messaging from '../message';

import authAction from '../actions/auth';

import {
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAIL, 
    AUTH_LOGIN_RESULT
 } from '../../constants/auth';

 import { getPass } from './../../models/getter';

export default function ({ dispatch, getState }) {
    messaging.on(AUTH_LOGIN_RESULT, ({ login }) => {
        if (login) {
            authAction.success()(dispatch, getState);
        } else {
            authAction.fail()(dispatch, getState);
        }
      });

    messaging.on(AUTH_CHECK_SUCCESS, () => {
        // this.setState({ login: true });
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
