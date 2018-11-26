import * as React from 'react';
import { connect } from 'react-redux';
import FormLayout from './FormLayout';
import styled, { css } from 'react-emotion';
import { trim } from 'lodash';

import { KeyController } from 'app/keyController';
import Account from 'app/account';
import { AccountFactory } from 'app/account/accountFactory';
import { BCSign } from 'bcnetwork';

import accountsActions from 'popup/actions/account';

import { EosAccount } from './bcaccounts/eosAccount';
import { EthAccount } from './bcaccounts/ethAccount';
import Modal from 'ui/Modal';
import Loading from 'popup/pages/Loading';

const actions = {
  import: accountsActions.import
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  blockchain: BCSign;
  onBack (): void;
}

interface IWalletState {
  loading: boolean;
  seed?: string;
  error?: string;
  success?: boolean;
  bc?: string;
  data?: any;
}

class Wallet extends React.Component<IProps, IWalletState> {
  private account: Account;

  public state: IWalletState = {
    loading: false,
    seed: '',
    bc: null
  };

  public handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  public handleCheck = e => {
    e.preventDefault();
    this.createAccount().then(data => {
      this.setState({
        success: true,
        bc: this.account.bc,
        error: null,
        data
      });
    });
  };

  public createAccount () {
    const { blockchain } = this.props;
    const account = AccountFactory.create({
      bc: blockchain
    });

    try {
      const pk = KeyController.generateKeyFromSeedOrPK(trim(this.state.seed), blockchain);

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
        error: `Error: ${e}`
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
    this.setState(
      {
        loading: true
      },
      () => {
        if (data && this.account.bc === BCSign.EOS) {
          this.account.setExtra({ account: data.account_name });
        }

        this.props.import({
          bc: this.props.blockchain,
          privateKey: this.state.seed
        });
      }
    );
  };

  public render () {
    const { error, seed } = this.state;

    return (
      <Container>
        <FormLayout
          onSubmit={this.handleCheck}
          title="Input your PrivateKey:"
          onBack={this.props.onBack}
          submitButtonTitle="Check"
        >
          <Textaria name="seed" type="text" value={seed} onChange={this.handleInput} cols={40} rows={5} />
          {error && <ErrorEl>{error}</ErrorEl>}
          {!error && this.bcAccountRender()}
        </FormLayout>
        <Modal show={this.state.loading}>
          <Loading />
        </Modal>
      </Container>
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
const ErrorEl = styled('div')`
  margin-top: 10px;
  font-size: 120%;
`;
const Container = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
