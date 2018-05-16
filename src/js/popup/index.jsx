import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Create from "./ui/login/create";
import Balance from "./ui/balance";
import Login from "./ui/login/login";
import Wrapper from "./ui";
import Wallet from "./ui/wallet";

import authActions from "./actions/auth";

import {
  STATE_VIEW_CREATION,
  STATE_VIEW_MAIN,
  STATE_VIEW_LOGIN
} from "./../constants/state";

import messaging from "./message";
import { getPass } from "./../models/getter";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.state = {
      isNew: false,
      isCreate: false
    };

    this.authActions = bindActionCreators(authActions, dispatch);
  }

  componentDidMount() {
    this.addListeners();
    this.authActions.check();
  }

  addListeners() {
    messaging.on("auth:check:success", () => {
      this.setState({ login: true });
    });

    messaging.on("auth:check:failre", data => {
      this.checkPass(hasHash => {
        this.setState({ isNew: !hasHash });
      });
    });
  }

  checkPass(cb) {
    getPass().then(result => cb(!!result));
  }

  render() {
    console.log("app props:", this.props);

    switch (this.props.view) {
      case STATE_VIEW_CREATION: {
        return (
          <Wrapper>
            <Wallet />
          </Wrapper>
        );
      }

      case STATE_VIEW_MAIN: {
        return (
          <Wrapper>
            <Balance />
          </Wrapper>
        );
      }

      case STATE_VIEW_LOGIN: {
        return <Login />;
      }
    }

    if (this.state.isNew) {
      return <Create />;
    }

    return null;
  }
}

export default connect(({ state }) => ({
  view: state.view
}))(Popup);
