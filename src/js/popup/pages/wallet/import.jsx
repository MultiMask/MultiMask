import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './../../actions/account';
import AccountFactory from './../../../models/account/accountFactory';

class Wallet extends React.Component {
  state = {
    seed: ''
  };

  handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  handleCheck = e => {
    this.createAccount();
    this.getInfo();
  };

  handleSave = () => {
    this.props.create(this.account);
  };

  createAccount() {
    const { blockchain, network } = this.props;

    try {
      this.account = AccountFactory.create({
        blockchain,
        network,
        seed: this.state.seed
      });
    } catch (e) {
      this.setState({
        error: 'Wrong wordlist'
      });
    }
  }

  getInfo() {
    if (this.account) {
      this.account.getInfo().then(data => {
        this.setState({
          address: data.info.address,
          balance: data.info.balance,
          success: true
        });
      });
    }
  }

  render() {
    return (
      <div className="creation">
        <div>
          <div>
            <h3>Input seed:</h3>
            <textarea name="seed" type="text" value={this.state.seed} onChange={this.handleInput} cols="40" rows="5" />
          </div>
          {this.state.address &&
            this.state.balance && (
              <div>
                <div>
                  <dl>
                    <dd>Address:</dd>
                    <dt>{this.state.address}</dt>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dd>Balance:</dd>
                    <dt>{this.state.balance}</dt>
                  </dl>
                </div>
              </div>
            )}
          {this.state.error && <div>{this.state.error}</div>}
          <div>
            <button onClick={this.props.onBack} className="btn">
              Back
            </button>
            <button onClick={this.handleCheck} className="login__create btn primary">
              Check
            </button>
            {this.state.success && (
              <button onClick={this.handleSave} className="login__create btn primary">
                Import
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch =>
    bindActionCreators(
      {
        create: actions.create
      },
      dispatch
    )
)(Wallet);
