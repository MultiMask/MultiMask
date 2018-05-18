import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Login from "./ui/login";
import Create from "./ui/login/create";
import Account from "./ui/account";
import Wrapper from "./ui/header";
import Wallet from "./ui/wallet";

import authActions from "./actions/auth";

import {
  STATE_VIEW_CREATION,
  STATE_VIEW_MAIN,
  STATE_VIEW_LOGIN,
  STATE_VIEW_WALLET,
  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_INIT
} from "./../constants/state";

class Popup extends React.Component {

  componentDidMount() {
    this.props.check();
  }

  render() {
    console.log("app props:", this.props);

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
        return (
          <Wrapper>
            <Account />
          </Wrapper>
        );

      case STATE_VIEW_LOGIN:
        return <Login />;

      case STATE_VIEW_INIT:
        return <Create />;
    }

    return null;
  }
}

export default connect(
  ({ state }) => ({
    view: state.view
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)(Popup);
