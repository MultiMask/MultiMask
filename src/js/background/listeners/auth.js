export default ({ messaging, wallet, App }) => {
  // Is Auth
  messaging.on('auth:check', () => {
    const isAuth = App.isAuth();

    if (isAuth) {
      messaging.send({ type: 'auth:check:sucess' });
    } else {
      messaging.send({ type: 'auth:check:failre' });
    }
  });

  messaging.on('auth:init', data => {
    App.login(data.pass);
  });
};
