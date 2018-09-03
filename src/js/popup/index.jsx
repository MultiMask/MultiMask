import React from 'react';
import Routes from './routes';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../config/theme';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import authActions from './actions/auth';

const Popup = ({ store, history }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default connect(
  null,
  dispatch => bindActionCreators(authActions, dispatch)
)(Popup);
