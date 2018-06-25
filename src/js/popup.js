import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './popup/store';

import App from './popup/index.jsx';
import Listeners from './popup/listeners';
import '../css/popup.less';
import '../img/logo.png';

const store = configureStore();
Listeners({
  dispatch: store.dispatch.bind(store)
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.getElementById('app-container')
);
