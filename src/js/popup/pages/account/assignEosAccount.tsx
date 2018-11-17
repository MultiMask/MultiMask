import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'react-emotion';
import { css } from 'emotion';

import { IWalletInfo } from 'types/accounts';
import { getCurrentWallet } from './../../select';
import Wallet from './common/Wallet';
import { eosActions } from '../../actions/eos';

import { EosAccount } from './../wallet/bcaccounts/eosAccount';

interface IState {
  accounts?: any[];
}

interface IProps extends Actions<typeof eosActions> {
  account: IWalletInfo;
}

class Assign extends React.Component<IProps, IState> {
  public state: IState = {};

  public handleSave = account => {
    this.props.setAccountToKey(this.props.account.key, account);
  };

  public componentDidMount () {
    this.props.getKeyAccounts(this.props.account.key).then(response => {
      this.setState({ accounts: response.payload });
    });
  }

  public render () {
    const { account } = this.props;
    const { accounts } = this.state;

    return (
      <React.Fragment>
        <Wallet data={account} />
        {accounts && (
          <Wrap>
            <EosAccount accounts={accounts} onImport={this.handleSave} />
          </Wrap>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter<any>(
  connect(
    (state: IPopup.AppState) => ({
      account: getCurrentWallet(state)
    }),
    eosActions as any
  )(Assign)
);

const Wrap = styled('div')`
  padding: 10px 20px;
`;
