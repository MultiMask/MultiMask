import React from "react";

import messaging from "./message";

export default class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      pass: "",
      isGenerate: false
    };
  }

  handleLogin = () => {
    // if (this.props.onCreate) {
    //   this.props.onCreate();
    // }
  };

  handlePass = e => {
    this.setState({ pass: e.target.value });
  };

  toggleGenerate = () => {
    this.setState({ isGenerate: true });
  };

  handleSubmit = () => {
    const type = this.props.isLogin ? "wallet_auth" : "wallet_create";

    messaging.send({
      type,
      payload: {
        pass: this.state.pass
      }
    });
  };

  showAuth() {
    return this.props.isLogin;
  }

  showGenerateBtn() {
    return !this.props.isLogin && this.state.isGenerate;
  }

  showCreate() {
    return !this.props.isLogin && !this.state.isGenerate;
  }

  render() {
    const { isLogin } = this.props;

    return (
      <div className="login__wrapper">
        <header className="login__wrapper-header">
          <h1>MultiMask</h1>
        </header>
        <div className="login__content">
          {this.showCreate() && (
            <div onClick={this.toggleGenerate} className="login__create btn">
              New Address
            </div>
          )}
          {this.showAuth() && (
            <div>
              <div className="login__create">
                <input
                  placeholder="enter password"
                  className="login__input"
                  type="password"
                  onChange={this.handlePass}
                  value={this.state.pass}
                />
              </div>
              <div onClick={this.handleSubmit} className="login__create btn">
                login
              </div>
            </div>
          )}
          {this.showGenerateBtn() && (
            <div>
              <div className="login__create">
                <input
                  placeholder="enter password"
                  className="login__input"
                  type="password"
                  onChange={this.handlePass}
                  value={this.state.pass}
                />
              </div>
              <div onClick={this.handleSubmit} className="login__create btn">
                create
              </div>
            </div>
          )}
          {this.props.error && (
            <div className="login__error">Wrong password</div>
          )}
        </div>
      </div>
    );
  }
}
