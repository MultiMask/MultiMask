import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { bindActionCreators, ActionCreator, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import styled from 'react-emotion';
import { css } from 'emotion';

import { getCurrentWallet } from './../../select';
import Wallet from './common/Wallet';
import { eosActions } from '../../actions/eos';
import Typography from '../../ui/Typography';

import { EosAccount } from './../wallet/bcaccounts/eosAccount';
import { any } from 'prop-types';

interface IState {
  accounts?: any[];
}

type OmitMiddleFunction<T> = T extends (...args: infer A1) => (...args: any[]) => infer F ? (...args: A1) => F : never;
type Actions<T> = { [K in keyof T]: OmitMiddleFunction<T[K]> };
interface IProps extends Actions<typeof eosActions> {
  account: WalletInfo;
}

class Assign extends React.Component<IProps, IState> {
  public state: IState = {};

  public handleSave = account => {
    this.props.setAccountToKey(this.props.account.id, account);
  };

  public componentDidMount () {
    this.props.getKeyAccounts(this.props.account.id).then(accounts => {
      this.setState({ accounts });
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
