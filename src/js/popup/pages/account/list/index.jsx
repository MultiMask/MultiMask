import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getPrice from '../../../../helpers/getPrice';
import stateActions from '../../../actions/state';
import Icon from '../../../ui/components/Icon';
import Item from './item';

class AccountList extends React.Component {
  render() {
    if (Array.isArray(this.props.accounts) && this.props.accounts.length) {
      let total = { balance: 0 };

      return (
        <React.Fragment>
          <div className="Wallets">
            <div className="Wallets-Items">
              {this.props.accounts.map(account => {
                total.balance += account.info.balance;

                return (
                  <div key={account.name} className="Wallets-Item">
                    <Item account={account} prices={this.prices} />
                  </div>
                );
              })}
            </div>
            <div className="Wallets-Total">
              <div className="Wallets-Label">total:</div>
              <div className="Wallets-Value">{total.balance} BTC</div>
              <div className="Wallets-Label">{getPrice(this.props.settings.prices, 'BTC', total.balance)} USD</div>
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

  getUSDbyTotal(total) {
    if (!this.priceInUSD('BTC')) {
      return '?';
    }

    const usd = total * this.priceInUSD('BTC');
    return isNaN(usd) ? '?' : usd.toFixed(2);
  }

  priceInUSD(sign) {
    return this.prices && this.prices[sign] && this.prices[sign].USD;
  }

  get prices() {
    return (this.props.settings && this.props.settings.prices) || {};
  }
}

export default connect(
  ({ account, settings }) => ({
    accounts: account.accounts,
    settings
  }),
  dispatch => bindActionCreators(stateActions, dispatch)
)(AccountList);
