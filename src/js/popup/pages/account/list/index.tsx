import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IWalletInfo } from 'types/accounts';

import { BcIcon } from 'ui';
import priceActions from 'popup/actions/prices';

import Item from './item';

const actions = {
  ...priceActions
};
type IPropsActions = Actions<typeof actions>;
interface IProps extends IPropsActions {
  accounts: IWalletInfo[];
  showTotal: boolean;
}

class AccountList extends React.Component<IProps, {}> {
  public render () {
    const { getPrice, getPriceInBTC } = this.props;

    if (Array.isArray(this.props.accounts) && this.props.accounts.length) {
      const total = { balanceInBTC: 0 };

      return (
        <React.Fragment>
          <div className="Wallets">
            <div className="Wallets-Items">
              {this.props.accounts.map(account => {
                total.balanceInBTC += getPriceInBTC(account.info.balance, account.blockchain);

                return (
                  <div key={account.info.address} className="Wallets-Item">
                    <Item account={account} />
                  </div>
                );
              })}
            </div>
            {this.props.showTotal ? (
              <div className="Wallets-Total">
                <div className="Wallets-Label">total:</div>
                <div className="Wallets-Value">{total.balanceInBTC.toFixed(8)} BTC</div>
                <div className="Wallets-Label">{getPrice(total.balanceInBTC, 'BTC')} USD</div>
              </div>
            ) : null}
          </div>
        </React.Fragment>
      );
    }

    return (
      <div className="NoWallets">
        <div className="NoWallets-Icon">
          <BcIcon className="Icon" type="no-wallets" size="xl" />
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
  ({ account, settings }: IPopup.AppState) => ({
    accounts: account.accounts,
    showTotal: settings.show_total
  }),
  actions
)(AccountList as any);
