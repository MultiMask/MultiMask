import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ACCOUNT_CREATE } from "./../../../constants/account";
import actions from "./../../actions/account";

import messaging from "../../message";
import AccountFactory from "./../../../models/accountFactory";

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.state = {
      step: 1,
      network: "bitcoin",
      seed: null
    };

    this.actions = bindActionCreators(actions, dispatch);
  }

  handleSelect = e => {
    this.setState({ network: e.target.value });
  };

  handleDone = () => {
    this.account = AccountFactory.create({ network: this.state.network });
    const seed = this.account.create();

    this.setState({ step: 2, seed });
  };

  handleSave = () => {
    this.actions.create(this.account);
    this.props.onCreated();
  };

  render() {
    return (
      <div className="header">
        {this.state.step === 1 && (
          <div>
            <div>
              <h4>Choose network:</h4>
              <select onChange={this.handleSelect} value={this.state.network}>
                <option value="bicoin">Bitcoin</option>
                <option value="karma">Karma</option>
              </select>
            </div>
            <button
              onClick={this.handleDone}
              className="login__create btn primary"
            >
              create
            </button>
          </div>
        )}
        {this.state.step === 2 && (
          <div>
            <div>
              <h3>Save seed save:</h3>
              <div>{this.state.seed}</div>
            </div>
            <button
              onClick={this.handleSave}
              className="login__create btn primary"
            >
              I saved Seed
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(Wallet);
