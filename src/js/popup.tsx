import * as React from 'react';
import { render } from 'react-dom';
import { configureStore, history } from './popup/store';
import App from './popup/index';
import '../css/popup.less';
import '../img/logo.png';

const store = configureStore({});

render(<App store={store} history={history} />, window.document.getElementById('app-container'));
