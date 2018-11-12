import * as React from 'react';
import { render } from 'react-dom';
import { configureStore, history, subscriber } from './popup/store';
import App from './popup/index';
import '../css/popup.less';
import '../img/logo.png';

import authActions from 'popup/actions/auth';

configureStore().then(store => {
  store.subscribe(subscriber(store));
  authActions.check()(store.dispatch, store.getState);

  render(<App store={store} history={history} />, window.document.getElementById('app-container'));
});
