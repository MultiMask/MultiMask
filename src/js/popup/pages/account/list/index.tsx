import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getPrice from '../../../../helpers/getPrice';
import getPriceInBTC from '../../../../helpers/getPriceInBTC';
import stateActions from '../../../actions/state';
import Icon from '../../../ui/components/Icon';
import Item from './item';

class AccountList extends React.Component<any, any> {
  render() {
    if (Array.isArray(this.props.accounts) && this.props.accounts.length) {
      let total = { balanceInBTC: 0 };

      return (
        <React.Fragment>
          <div className="Wallets">
            <div className="Wallets-Items">
              {this.props.accounts.map(account => {
                total.balanceInBTC += getPriceInBTC(this.props.settings.prices, account);

                return (
                  <div key={account.name} className="Wallets-Item">
                    <Item account={account} prices={this.prices} />
                  </div>
                );
              })}
            </div>
            {this.props.settings.show_total ? (
              <div className="Wallets-Total">
                <div className="Wallets-Label">total:</div>
                <div className="Wallets-Value">{total.balanceInBTC} BTC</div>
                <div className="Wallets-Label">
                  {getPrice(this.props.settings.prices, 'BTC', total.balanceInBTC)} USD
                </div>
              </div>
            ) : null}
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
  ({ account, settings }: any) => ({
    accounts: account.accounts,
    settings
  }),
  dispatch => bindActionCreators(stateActions, dispatch)
)(AccountList);
