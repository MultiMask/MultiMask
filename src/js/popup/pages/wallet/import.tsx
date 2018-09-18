import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
import styled, { css } from 'react-emotion';
import actions from './../../actions/account';
import AccountFactory from './../../../app/account/accountFactory';
import Typography from '../../ui/Typography';
import Button from '../../ui/Button';

import networks from './../../../blockchain';
import Account from './../../../app/account';

interface IWalletState {
  seed?: string;
  error?: string;
  address?: string;
  balance?: string;
  success?: boolean;
  eos?: any;
}

class Wallet extends React.Component<any, IWalletState> {
  private account: Account;

  public state: IWalletState = {
    seed: ''
  };

  public handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  public handleCheck = e => {
    e.preventDefault();
    this.createAccount()
      .then(() => {
        if (this.isEos()) {
          this.getEosAccounts();
        } else {
          this.getInfo();
        }
      })
  };

  public handleSave = () => {
    this.props.create(this.account);
  };

  public createAccount() {
    const { blockchain, network } = this.props;

    try {
      return AccountFactory.create({
        blockchain,
        network,
        secret: {
          seed: this.state.seed
        }
      }).init()
        .then(account => this.account = account);
    } catch (e) {
      this.setState({
        error: `Wrong wordlist: ${e}`
      });

      return Promise.reject();
    }
  }

  private getInfo() {
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

  private getEosAccounts() {
    this.account.wallet.getKeyAccounts()
      .then(accounts => {
        this.setState(state => ({
          ...state,
          success: true,
          eos: accounts
        }))
      })
  }

  private isEos() {
    return this.account && this.account.blockchain === networks.EOS.sign;
  }

  private ethImport() {
    const { success, address, balance } = this.state;

    if (success) {
      return (
        <React.Fragment>
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
          <Button
            className={css`
              margin-top: 50px;
            `}
            onClick={this.handleSave}
          >
            Import
          </Button>
        </React.Fragment>
      )
    }
  }

  private eosImport() {
    const { success, eos } = this.state;

    if (success) {
      return eos.map((account, idx) => {
        return (
          <React.Fragment key={idx}>
            <div>
              <Typography variant="subheading" color="main">
                Account: {account.account_name}
              </Typography>
              <Typography variant="subheading" color="main">
                Balance:
              </Typography>
              <Typography color="secondary">{account.core_liquid_balance}</Typography>
          </div>
          <Button
            className={css`
              margin-top: 50px;
            `}
            onClick={this.handleSave}
          >
            Import
          </Button>
        </React.Fragment>
        );
      });
    }
  }

  public render() {
    const { error, seed } = this.state;

    return (
      <FormLayout 
        onSubmit={this.handleCheck} 
        title="Input seed:" 
        onBack={this.props.onBack} 
        submitButtonTitle="Check"
      >
        <Textaria name="seed" type="text" value={seed} onChange={this.handleInput} cols={40} rows={5} />
        {error && <div>{error}</div>}
        {!this.isEos() && this.ethImport()}
        {this.isEos() && this.eosImport()}
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
