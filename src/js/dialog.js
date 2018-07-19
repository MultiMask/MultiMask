import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { theme } from './config/theme';

import App from './dialog/index.jsx';
import '../css/dialog.less';

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  window.document.getElementById('app-container')
);
