import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
import styled, { css } from 'react-emotion';

import AccountFactory from 'app/account/accountFactory';
import Account from 'app/account';
import actions from 'popup/actions/account';
import ntx, {BCSign} from 'bcnetwork';

import { EthAccount } from './bcaccounts/ethAccount';
import { EosAccount } from './bcaccounts/eosAccount';

interface IProps {
  create (account): Promise<void>;
  blockchain: BCSign;
  onBack (): void;
}

interface IWalletState {
  seed?: string;
  error?: string;
  success?: boolean;
  bc?: BCSign;
}

class Wallet extends React.Component<IProps, IWalletState> {
  private account: Account;

  public state: IWalletState = {
    seed: '',
    bc: null
  };

  public handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  public handleCheck = e => {
    e.preventDefault();
    this.createAccount()
      .then(account => {
        this.setState({ success: true,  bc: account.blockchain });
      })
  };

  public createAccount (): Promise<Account> {
    const { blockchain } = this.props;

    try {
      return AccountFactory.create({
        blockchain,
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

  public bcAccountRender = () => {
    if (!this.account) return null;

    switch (this.account.blockchain) {
      case BCSign.BTC:
      case BCSign.ETH:
        return <EthAccount account={this.account} onImport={this.handleSave}/>
      case BCSign.EOS:
        return <EosAccount account={this.account} onImport={this.handleSave}/>
      default:
        throw new Error(`Can't find this type account render`);
    }
  }

  public handleSave = data => {
    if (this.account.blockchain === BCSign.EOS) {
      this.account.setExtra({ account: data.account_name });
    }

    this.props.create(this.account);
  }

  public render () {
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
        {this.bcAccountRender()}
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
