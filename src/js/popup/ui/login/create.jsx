import React from "react";

import messaging from "../../message";

export default class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      passStep1: "",
      passStep2: "",
      step: 1
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleNext = () => {
    if (this.validatePass(this.state.passStep1)) {
      this.setState({ step: 2 });
    }
  };

  handleDone = () => {
    console.log("done");
  };

  handleBack = () => {
    this.setState({ step: 1 });
  };

  handleSubmit = () => {
    if (this.isPassCorrect()) {
      messaging.send({
        type: "auth:init",
        payload: {
          pass: this.state.passStep1
        }
      });

      this.setState({ step: 3 });
    }
  };

  isPassCorrect = () => {
    const { passStep1, passStep2 } = this.state;

    return passStep1 === passStep2;
  };

  validatePass(pass) {
    // For test allow easy pswds
    // if (!pass || pass.length < 6) {
    //   this.setState({ error: 'Too short password.' });
    //   return false;
    // }

    this.setState({ error: null });
    return true;
  }

  render() {
    return (
      <div className="login__wrapper">
        <header className="login__wrapper-header">
          <h3>Create new account</h3>
        </header>
        <div className="login__content">
          {this.state.step == 1 && (
            <div>
              <div className="login__create">
                <input
                  placeholder="enter password"
                  className="login__input"
                  type="password"
                  name="passStep1"
                  onChange={this.handleInput}
                  value={this.state.passStep1}
                />
              </div>
              <button
                onClick={this.handleNext}
                className="login__create btn primary"
              >
                next
              </button>
            </div>
          )}
          {this.state.step == 2 && (
            <div>
              <div className="login__create">
                <input
                  placeholder="repeat password"
                  className="login__input"
                  type="password"
                  name="passStep2"
                  onChange={this.handleInput}
                  value={this.state.passStep2}
                />
              </div>
              <div onClick={this.handleBack} className="login__create btn">
                back
              </div>
              <button
                onClick={this.handleSubmit}
                className="login__create btn primary"
                disabled={!this.isPassCorrect()}
              >
                create
              </button>
            </div>
          )}
          {this.state.step == 3 && (
            <div>
              <button
                onClick={this.handleDone}
                className="login__create btn primary"
              >
                Done
              </button>
            </div>
          )}
          {this.state.error && (
            <div className="login__error">{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}
