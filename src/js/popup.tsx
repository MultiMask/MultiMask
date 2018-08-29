import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './popup/store';

import { ThemeProvider } from 'emotion-theming';
import { theme } from './config/theme';
import App from './popup/index';
import '../css/popup.less';
import '../img/logo.png';

const store = configureStore();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  window.document.getElementById('app-container')
);
