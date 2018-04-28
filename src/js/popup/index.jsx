import React from "react";

import Create from "./ui/create";
import Balance from "./ui/balance";
import Login from "./ui/login";
import Wrapper from "./ui";

import messaging from "./message";
import { getPass } from './../models/getter';

export default class Popup extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      login: false,
      isNew: false,
      isCreate: false,
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
    console.log('create ');
  }

  onLogin = () => {
    this.setState({ login: true });
    console.log('login');
  }

  render() {
    console.log('state', this.state);

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
