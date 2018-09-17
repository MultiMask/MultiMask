import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
import styled, { css } from 'react-emotion';
import actions from './../../actions/account';
import AccountFactory from './../../../app/account/accountFactory';
import Typography from '../../ui/Typography';
import Button from '../../ui/Button';

class Wallet extends React.Component<any, any> {
  private account;

  public state: any = {
    seed: ''
  };

  public handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  public handleCheck = e => {
    e.preventDefault();
    this.createAccount();
    this.getInfo();
  };

  public handleSave = () => {
    this.props.create(this.account);
  };

  public createAccount() {
    const { blockchain, network } = this.props;

    try {
      this.account = AccountFactory.create({
        blockchain,
        network,
        secret: {
          seed: this.state.seed
        }
      }).init();
    } catch (e) {
      this.setState({
        error: `Wrong wordlist: ${e}`
      });
    }
  }

  public getInfo() {
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

  public render() {
    const { address, success, balance, error } = this.state;

    return (
      <FormLayout onSubmit={this.handleCheck} title="Input seed:" onBack={this.props.onBack} submitButtonTitle="Check">
        <Textaria name="seed" type="text" value={this.state.seed} onChange={this.handleInput} cols={40} rows={5} />
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
        {success && (
          <Button
            className={css`
              margin-top: 50px;
            `}
            onClick={this.handleSave}
          >
            Import
          </Button>
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

type TextariaProps = Partial<HTMLTextAreaElement> & {
  theme?: any;
}
const Textaria = styled('textarea')`
  outline: none;
  border: 1px solid ${(props: TextariaProps) => props.theme.colors.secondary};
  border-radius: 5px;
  resize: none;
`;
