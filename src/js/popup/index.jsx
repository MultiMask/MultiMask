import React from "react";

import Login from "./login";
import Balance from "./balance";

import messaging from "./message";
import { isHavePass } from './../models/getter';

export default class Popup extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      login: false
    };
  }

  componentDidMount() {
    messaging.send({
      type: "is_auth"
    });

    // this.addListeners();
    this.checkPass();
  }

  addListeners() {
    // messaging.on("has_wallet_result", data => {
    //   this.setState({
    //     ...data
    //   });
    // });

    // messaging.on("wallet_create_success", data => {
    //   this.setState({
    //     storage: true,
    //     login: true
    //   });
    // });

    // messaging.on("wallet_auth_result", res => {
    //   if (!res) {
    //     this.setState({ error: true });
    //   } else {
    //     this.setState({
    //       storage: true,
    //       login: true
    //     });
    //   }
    // });
  }

  checkPass() {
    isHavePass().then(result => {
      this.setState({ login: !!result })
    })
  }

  onSend = () => {
    messaging.send({
      type: "tx_create"
    });
  };

  render() {
    return (
      <div>
        {!this.state.login && (
          <Login isLogin={this.state.login} />
        )}
        {this.state.login && <Balance onSend={this.onSend} />}
      </div>
    );
  }
}
