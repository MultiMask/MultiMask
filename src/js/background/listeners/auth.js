import {
  AUTH_INIT,
  AUTH_CHECK,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_RESULT,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL
} from './../../constants/auth';

export default ({ messaging, App }) => {
  messaging.on(AUTH_INIT, data => {
    App.create(data.pass);
  });

  messaging.on(AUTH_LOGIN, data => {
    const completed = App.login(data.pass);
    messaging.send({
      type: AUTH_LOGIN_RESULT,
      payload: {
        login: completed
      }
    });
  });

  messaging.on(AUTH_LOGOUT, () => {
    const isLogout = App.logout();

    if (isLogout) {
      messaging.send({ type: AUTH_LOGOUT_SUCCESS });
    } else {
      messaging.send({ type: AUTH_LOGOUT_FAIL });
    }
  });

  messaging.on(AUTH_CHECK, () => {
    const isAuth = App.isAuth();

    if (isAuth) {
      messaging.send({ type: AUTH_CHECK_SUCCESS });
    } else {
      messaging.send({ type: AUTH_CHECK_FAIL });
    }
  });
};
