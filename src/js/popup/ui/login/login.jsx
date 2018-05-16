import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import authAction from "../../actions/auth";

import messaging from "../../message";

class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      pass: "",
      error: ""
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDone = () => {
    this.props.login(this.state.pass);
  };

  render() {
    return (
      <div className="login__wrapper">
        <header className="login__wrapper-header">
          <h2>MultiMask</h2>
          <h4>Login to your acccount</h4>
        </header>
        <div className="login__content">
          <div>
            <div className="login__create">
              <input
                placeholder="enter password"
                className="login__input"
                type="password"
                name="pass"
                onChange={this.handleInput}
                value={this.state.pass}
              />
            </div>
            <button
              onClick={this.handleDone}
              className="login__create btn primary"
            >
              login
            </button>
          </div>
          {this.state.error && (
            <div className="login__error">{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ state }) => ({}),
  dispatch => bindActionCreators(authAction, dispatch)
)(Auth);
