import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthLayout from './layouts/AuthLayout';
import Login from './pages/login';
import Create from './pages/login/create';
import Account from './pages/account';
import Wrapper from './ui/header';
import Wallet from './pages/wallet';

import authActions from './actions/auth';

import {
  STATE_VIEW_CREATION,
  STATE_VIEW_MAIN,
  STATE_VIEW_LOGIN,
  STATE_VIEW_WALLET,
  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_INIT,
  STATE_VIEW_EXPORTPK
} from './../constants/state';

class Popup extends React.Component {
  componentDidMount() {
    this.props.check();
  }

  render() {
    console.log('app props:', this.props);

    switch (this.props.view) {
      case STATE_VIEW_CREATION:
        return (
          <Wrapper>
            <Wallet />
          </Wrapper>
        );

      case STATE_VIEW_MAIN:
      case STATE_VIEW_WALLET:
      case STATE_VIEW_BUY:
      case STATE_VIEW_SEND:
      case STATE_VIEW_EXPORTPK:
        return (
          <Wrapper>
            <Account />
          </Wrapper>
        );

      case STATE_VIEW_LOGIN:
        return (
          <AuthLayout>
            <Login />
          </AuthLayout>
        );

      case STATE_VIEW_INIT:
        return <Create />;

      // TODO: make error page or logger
      default:
        return null;
    }
  }
}

export default connect(
  ({ state }) => ({
    view: state.view
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)(Popup);
