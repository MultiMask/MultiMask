import {
  AUTH_INIT,
  AUTH_INIT_DONE,
  AUTH_CHECK,
  AUTH_CHECK_RESULT,
  AUTH_LOGIN,
  AUTH_LOGIN_RESULT,
  AUTH_LOGOUT,
  AUTH_LOGOUT_RESULT
} from './../../constants/auth';

export default ({ App }) => ({ type, payload }, sendResponse) => {
  switch (type) {
    case AUTH_INIT: {
      App.create(payload.pass);

      sendResponse({
        type: AUTH_INIT_DONE
      });
      break;
    }

    case AUTH_CHECK: {
      sendResponse({
        type: AUTH_CHECK_RESULT,
        payload: { isAuth: App.isAuth() }
      });
      break;
    }

    case AUTH_LOGIN: {
      App.login(payload.pass).then(login => {
        sendResponse({
          type: AUTH_LOGIN_RESULT,
          payload: { login }
        });
      });
      break;
    }

    case AUTH_LOGOUT: {
      sendResponse({
        type: AUTH_LOGOUT_RESULT,
        payload: { isLogout: App.logout() }
      });
      break;
    }
  }
};
