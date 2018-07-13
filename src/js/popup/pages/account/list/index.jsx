import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stateActions from '../../../actions/state';
import Icon from '../../../ui/components/Icon';
import Item from './item';

class AccountList extends React.Component {
  render() {
    if (this.props.accounts && this.props.accounts.length > 0) {
      let total = { balance: 0 };

      return (
        <React.Fragment>
          <div className="Wallets">
            <div className="Wallets-Items">
              {this.props.accounts.map(account => {
                total.balance += account.info.balance;

                return (
                  <div key={account.name} className="Wallets-Item">
                    <Item account={account} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Wallets-Total">
            <div className="Wallets-Label">Total:</div>
            <div className="Wallets-Value">
              {total.balance}
              <br />BTC
            </div>
            <div className="Wallets-Label">
              ?<br />USD
            </div>
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="NoWallets">
        <div className="NoWallets-Icon">
          <Icon className="Icon" type="no-wallets" size="xl" />
        </div>
        <div className="NoWallets-Title">
          <span>No wallets</span>
        </div>
        <div className="NoWallets-Actions">
          <a className="Link" onClick={this.props.createWallet}>
            Create new
          </a>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ account }) => ({
    accounts: account.accounts
  }),
  dispatch => bindActionCreators(stateActions, dispatch)
)(AccountList);
