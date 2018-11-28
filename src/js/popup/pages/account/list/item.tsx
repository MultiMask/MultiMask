import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BcIcon } from 'ui';

import accountActions from 'popup/actions/account';
import priceActions from 'popup/actions/prices';

class AccountFastView extends React.Component<any, any> {
  get image () {
    const { account } = this.props;

    return account.blockchain ? <BcIcon type={account.blockchain} /> : null;
  }

  get balance () {
    const { account } = this.props;
    return `${account.info.balance} ${account.blockchain}`;
  }

  public handleClick = () => {
    const { account, setActive } = this.props;

    setActive(account.key);
  };

  public render () {
    const { account, getPrice } = this.props;

    return (
      <div className="Wallet" onClick={this.handleClick}>
        <div className="Wallet-Inner">
          <div className="Wallet-Icon">{this.image}</div>
          <div className="Wallet-Info">
            <div className="Wallet-Address" title={account.info.address}>
              {account.info.address}
            </div>
            <div className="Wallet-Balance">{this.balance}</div>
            <div className="Wallet-Balance-USD">{getPrice(account.info.balance, account.blockchain)} USD</div>
          </div>
          <div className="Wallet-Network">{account.info.network}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    ...accountActions,
    ...priceActions
  }
)(AccountFastView);
