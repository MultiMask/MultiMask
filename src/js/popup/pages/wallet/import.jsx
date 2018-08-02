import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
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
        secret: {
          seed: this.state.seed
        }
      });
    } catch (e) {
      this.setState({
        error: `Wrong wordlist: ${e}`
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
      <FormLayout onSubmit={this.handleCheck} title="Input seed:" onBack={this.props.onBack}>
        <textarea name="seed" type="text" value={this.state.seed} onChange={this.handleInput} cols="40" rows="5" />
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
        {this.state.success && (
          <button onClick={this.handleSave} className="login__create btn primary">
            Import
          </button>
        )}
      </FormLayout>
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
