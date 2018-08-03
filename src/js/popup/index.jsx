import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/login';
import Create from './pages/login/create';
import Account from './pages/account';
import Wallet from './pages/wallet';
import Profile from './pages/profile';
import Settings from './pages/settings';

import authActions from './actions/auth';

import {
  STATE_VIEW_CREATION,
  STATE_VIEW_MAIN,
  STATE_VIEW_LOGIN,
  STATE_VIEW_WALLET,
  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_INIT,
  STATE_VIEW_EXPORTPK,
  STATE_VIEW_PROFILES,
  STATE_VIEW_EXPORT_PROFILE,
  STATE_VIEW_IMPORT_PROFILE,
  STATE_VIEW_QRCODE_PROFILE,
  STATE_VIEW_SETTINGS
} from './../constants/state';

class Popup extends React.Component {
  componentDidMount() {
    this.props.check();
  }

  render() {
    switch (this.props.view) {
      case STATE_VIEW_PROFILES:
      case STATE_VIEW_EXPORT_PROFILE:
      case STATE_VIEW_IMPORT_PROFILE:
      case STATE_VIEW_QRCODE_PROFILE:
        return (
          <MainLayout>
            <Profile />
          </MainLayout>
        );

      case STATE_VIEW_CREATION:
        return (
          <MainLayout>
            <Wallet />
          </MainLayout>
        );

      case STATE_VIEW_MAIN:
      case STATE_VIEW_WALLET:
      case STATE_VIEW_BUY:
      case STATE_VIEW_SEND:
      case STATE_VIEW_EXPORTPK:
        return (
          <MainLayout>
            <Account />
          </MainLayout>
        );
      // TODO: make more beautifully using layout and routing
      case STATE_VIEW_LOGIN:
        return (
          <AuthLayout login>
            <Login />
          </AuthLayout>
        );

      case STATE_VIEW_INIT:
        return (
          <AuthLayout>
            <Create />
          </AuthLayout>
        );

      case STATE_VIEW_SETTINGS:
        return (
          <MainLayout>
            <Settings />
          </MainLayout>
        );

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
