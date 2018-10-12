import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import styled from 'react-emotion';
import { css } from 'emotion';

import { getCurrentWallet } from './../../select';
import Wallet from './common/Wallet';
import eosActions from '../../actions/eos';
import Typography from '../../ui/Typography';

import { EosAccount } from './../wallet/bcaccounts/eosAccount';

interface IState {
  accounts?: any[];
}

interface IProps {
  account: WalletInfo;
  getKeyAccounts (id: string): Promise<any[]>;
  setAccountToKey (id: string, account: string): Promise<any[]>;
}

class Assign extends React.Component<IProps, IState> {

  public state: IState = {};

  public handleSave = (account) => {
    this.props.setAccountToKey(this.props.account.id, account);
  }

  public componentDidMount () {
    this.props.getKeyAccounts(this.props.account.id)
      .then(accounts => {
        this.setState({accounts});
      })
  }

  public render () {
    const { account } = this.props;
    const { accounts } = this.state;

    return (
      <React.Fragment>
        <Wallet data={account} />
        {accounts && (
          <Wrap>
            <EosAccount accounts={accounts} onImport={this.handleSave}/>
          </Wrap>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(connect(
  (state: any) => ({
    account: getCurrentWallet(state)
  }),
  dispatch => bindActionCreators(eosActions, dispatch)
)(Assign));

const Wrap = styled('div')`
  padding: 10px 20px;
`;
