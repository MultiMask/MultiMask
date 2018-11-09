import * as React from 'react';
import { render } from 'react-dom';
import { configureStore, history, subscriber } from './popup/store';
import App from './popup/index';
import '../css/popup.less';
import '../img/logo.png';

configureStore().then(store => {
  store.subscribe(subscriber(store));

  render(<App store={store} history={history} />, window.document.getElementById('app-container'));
});
