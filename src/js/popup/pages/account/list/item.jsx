import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import networkSign from '../../../../helpers/networkSign';
import accountActions from '../../../actions/account';
import Icon from '../../../ui/components/Icon';

class AccountFastView extends React.Component {
  get image() {
    const { account } = this.props;

    return account.blockchain ? <Icon type={account.blockchain} /> : null;
  }

  get balance() {
    const { account } = this.props;
    return `${account.info.balance} ${networkSign(account)}`;
  }

  handleClick = () => {
    const { account, setActive } = this.props;

    setActive(account.name);
  };

  render() {
    const { account } = this.props;

    return (
      <div className="Wallet" onClick={this.handleClick}>
        <div className="Wallet-Inner">
          <div className="Wallet-Icon">{this.image}</div>
          <div className="Wallet-Info">
            <div className="Wallet-Address" title={account.info.address}>
              {account.info.address}
            </div>
            <div className="Wallet-Balance">{this.balance}</div>
            <div className="Wallet-Balance-USD">? USD</div>
          </div>
          <div className="Wallet-Network">{account.network}</div>
        </div>
      </div>
    );

    return null;
  }
}

export default connect(
  null,
  dispatch => bindActionCreators(accountActions, dispatch)
)(AccountFastView);
