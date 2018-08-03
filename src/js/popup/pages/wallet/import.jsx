import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
import styled from 'react-emotion';
import actions from './../../actions/account';
import AccountFactory from './../../../models/account/accountFactory';
import Typography from '../../ui/Typography';
import Button from '../../ui/Button';

class Wallet extends React.Component {
  state = {
    seed: ''
  };

  handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  handleCheck = e => {
    e.preventDefault();
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
    const { address, success, balance, error } = this.state;

    return (
      <FormLayout onSubmit={this.handleCheck} title="Input seed:" onBack={this.props.onBack} submitButtonTitle="Check">
        <Textaria name="seed" type="text" value={this.state.seed} onChange={this.handleInput} cols="40" rows="5" />
        {this.state.success && (
          <div>
            <Typography variant="subheading" color="main">
              Address:
            </Typography>
            <Typography color="secondary">{address}</Typography>
            <Typography variant="subheading" color="main">
              Balance:
            </Typography>
            <Typography color="secondary">{balance}</Typography>
          </div>
        )}
        {error && <div>{error}</div>}
        {success && <Button onClick={this.handleSave}>Import</Button>}
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

const Textaria = styled.textarea`
  outline: none;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 5px;
  resize: none;
`;
