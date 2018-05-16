import {
  AUTH_CHECK,
  AUTH_LOGIN,
  AUTH_LOGIN_RESULT
} from './../../constants/auth';

export default ({ messaging, App }) => {
  // Is Auth?
  messaging.on(AUTH_CHECK, () => {
    const isAuth = App.isAuth();

    if (isAuth) {
      messaging.send({ type: 'auth:check:success' });
    } else {
      messaging.send({ type: 'auth:check:failre' });
    }
  });

  messaging.on('auth:init', data => {
    App.create(data.pass);
  });

  messaging.on(AUTH_LOGIN, data => {
    const completed = App.login(data.pass);

    messaging.send({ type: AUTH_LOGIN_RESULT, payload: {
      login: completed
    }});
  });
};
