import React from "react";

import Create from "./ui/login/create";
import Balance from "./ui/balance";
import Login from "./ui/login/login";
import Wrapper from "./ui";
import Wallet from './ui/wallet';

import messaging from "./message";
import { getPass } from './../models/getter';

export default class Popup extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      login: false,
      isNew: false,
      isCreate: false,
      creation: false,
    };
  }

  componentDidMount() {
    this.addListeners();

    messaging.send({
      type: "auth:check"
    });
  }


  addListeners() {
    messaging.on("auth:check:success", () => {
      this.setState({ login: true })
    });

    messaging.on("auth:check:failre", data => {
      this.checkPass((hasHash) => {
        this.setState({ isNew: !hasHash })
      });
    });
  }

  checkPass(cb) {
    getPass().then(result => cb(!!result));
  }

  onCreate = () => {
    this.setState({ creation: true })
  }

  onCreated = () => {
    this.setState({ creation: false })
  }

  onLogin = () => {
    this.setState({ login: true });
  }

  render() {
    if (this.state.creation) {
      return <Wallet 
        onCreated={this.onCreated}
      />;
    }

    if (this.state.login) {
      return <Wrapper
        onCreate={this.onCreate}
      >
          <Balance />
        </Wrapper>;
    }

    if (this.state.isNew) {
      return <Create />
    }

    if (!this.state.isNew) {
      return <Login 
        onLogin={this.onLogin}
      />
    }

    return null;
  }
}
