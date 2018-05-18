import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import authActions from "../../actions/auth";

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

  handleDone = e => {
    e.preventDefault();
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
          <form onSubmit={this.handleDone}>
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
            {this.props.error && (
              <div className="login__error">Wrong password</div>
            )}
            <button type="submit" className="login__create btn primary">
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ auth }) => ({
    error: auth.error
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)(Auth);
