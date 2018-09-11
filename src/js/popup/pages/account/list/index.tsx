import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Icon from '../../../ui/components/Icon';
import Item from './item';

import pricesActions from './../../../actions/price';

class AccountList extends React.Component<any, any> {
  public render() {
    if (Array.isArray(this.props.accounts) && this.props.accounts.length) {
      const total = { balanceInBTC: 0 };

      return (
        <React.Fragment>
          <div className="Wallets">
            <div className="Wallets-Items">
              {this.props.accounts.map(account => {
                total.balanceInBTC += this.props.getPriceInBTC(account.info.balance, account.blockchain);

                return (
                  <div key={account.name} className="Wallets-Item">
                    <Item account={account} />
                  </div>
                );
              })}
            </div>
            {this.props.settings.show_total ? (
              <div className="Wallets-Total">
                <div className="Wallets-Label">total:</div>
                <div className="Wallets-Value">{total.balanceInBTC} BTC</div>
                <div className="Wallets-Label">
                  {this.props.getPriceInUSD(total.balanceInBTC,'BTC')} USD
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
          <Link className="Link" to="/wallets/create">
            Create new
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ account, settings }: any) => ({
    accounts: account.accounts,
    settings
  }),
  dispatch => bindActionCreators(pricesActions, dispatch)
)(AccountList);
