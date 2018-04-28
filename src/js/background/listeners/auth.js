export default ({ messaging, wallet, App }) => {
  // Is Auth
  messaging.on('auth:check', () => {
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

  messaging.on('auth:login', data => {
    const completed = App.login(data.pass);

    messaging.send({ type: 'auth:login:result', payload: {
      login: completed
    }});
  });
};
