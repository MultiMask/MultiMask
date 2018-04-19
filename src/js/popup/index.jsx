import React from "react";

import Create from "./create";
import Balance from "./balance";
import Login from "./login";

import messaging from "./message";
import { getPass } from './../models/getter';

export default class Popup extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      login: false,
      isNew: false
    };
  }

  componentDidMount() {
    this.addListeners();

    messaging.send({
      type: "auth:check"
    });
  }


  addListeners() {
    messaging.on("auth:check:success", data => {
      this.setState({ login: true })
    });

    messaging.on("auth:check:failre", data => {
      this.checkPass((passHash) => {
        this.setState({ isNew: !passHash })
      });
    });
  }

  checkPass(cb) {
    getPass().then(result => {
      this.setState({ login: !!result })
      cb();
    })
  }

  render() {
    if (this.state.login) {
      return <Balance />;
    }

    if (this.state.isNew) {
      return <Create />
    }

    if (!this.state.isNew) {
      return <Login />
    }

    return null;
  }
}
