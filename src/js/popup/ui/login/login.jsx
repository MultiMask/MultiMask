import React from 'react';

import messaging from '../../message';

import App from '../../../models/app';

export default class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      pass: '',
      login: false,
      error: ''
    };
  }

  componentDidMount() {
    messaging.on('auth:login:result', ({login}) => {
      if (login) {
        this.setState({
          login: true,
          error: ''
        }, () => {
          this.commitLogin();
        });
      } else {
        this.setState({
          login: false,
          error: 'Wrong password'
        })
      }
    })
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  commitLogin() {
    this.props.onLogin();
  }

  handleDone = () => {
    messaging.send({
      type: "auth:login",
      payload: {
        pass: this.state.pass
      }
    });
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
