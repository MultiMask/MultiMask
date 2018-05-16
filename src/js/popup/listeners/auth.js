import messaging from '../message';

import authAction from '../actions/auth';
import { AUTH_LOGIN_RESULT } from '../../constants/auth';

export default function ({ dispatch, getState }) {
    messaging.on(AUTH_LOGIN_RESULT, ({ login }) => {
        if (login) {
            authAction.success()(dispatch, getState);
        } else {
            authAction.fail()(dispatch, getState);
        }
      });
}