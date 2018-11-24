import * as React from 'react';
import { connect } from 'react-redux';
import FormLayout from './FormLayout';
import styled, { css } from 'react-emotion';

import { isSeed } from 'helpers/checkers';
import { AccountFactory } from 'app/account/accountFactory';
import Account from 'app/account';
import accountsActions from 'popup/actions/account';
import ntx, { BCSign } from 'bcnetwork';

import { EthAccount } from './bcaccounts/ethAccount';
import { EosAccount } from './bcaccounts/eosAccount';

import { KeyController } from 'app/keyController';

const actions = {
  import: accountsActions.import
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  blockchain: BCSign;
  onBack(): void;
}

interface IWalletState {
  seed?: string;
  error?: string;
  success?: boolean;
  bc?: string;
  data?: any;
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
    this.createAccount().then(data => {
      this.setState({ success: true, bc: this.account.bc, data });
    });
  };

  public createAccount() {
    const { blockchain } = this.props;
    const account = AccountFactory.create({
      bc: blockchain
    });

    try {
      const pk = KeyController.generateKeyFromSeedOrPK(this.state.seed, blockchain);

      return account.init(pk).then(acc => {
        this.account = acc;
        if (acc.bc === BCSign.EOS) {
          return acc.wallet.getKeyAccounts();
        } else {
          return acc.getInfo();
        }
      });
    } catch (e) {
      this.setState({
        error: `Wrong wordlist: ${e}`
      });
      return Promise.reject();
    }
  }

  public bcAccountRender = () => {
    if (!this.account) {
      return null;
    }

    switch (this.account.bc) {
      case BCSign.BTC:
      case BCSign.ETH:
        return <EthAccount data={this.state.data} onImport={this.handleSave} />;
      case BCSign.EOS:
        return <EosAccount accounts={this.state.data} onImport={this.handleSave} />;
      default:
        throw new Error(`Can't find this type account render`);
    }
  };

  public handleSave = data => {
    if (data && this.account.bc === BCSign.EOS) {
      this.account.setExtra({ account: data.account_name });
    }

    this.props.import({
      bc: this.props.blockchain,
      privateKey: this.state.seed
    });
  };

  public render() {
    const { error, seed } = this.state;

    return (
      <FormLayout
        onSubmit={this.handleCheck}
        title="Input your PrivateKey:"
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
  actions
)(Wallet as any);

type TextariaProps = Partial<HTMLTextAreaElement> & {
  theme?: any;
};
const Textaria = styled('textarea')`
  outline: none;
  border: 1px solid ${(props: TextariaProps) => props.theme.colors.secondary};
  border-radius: 5px;
  resize: none;
`;
