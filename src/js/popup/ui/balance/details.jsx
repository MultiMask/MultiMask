import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

import actions from '../../actions/balance';

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.actions = bindActionCreators(actions, dispatch);
  }

  get choosenAccount() {
    const { accounts, wallet } = this.props;

    return accounts.find(acc => acc.name === wallet);
  }

  get image() {
    const account = this.choosenAccount;

    return <img src={networkImg(account)} />;
  }

  get balance() {
    const account = this.choosenAccount;

    return `${account.info.balance} ${networkSign(account)}`;
  }

  handleClick = () => {
    const { account, onChoose } = this.props;

    onChoose(account.name);
  }

  handleBuy = () => {
    this.actions.buy();
  }

  handleSend = () => {
    this.actions.send();
  }

  render() {
    const account = this.choosenAccount;
    // console.log('account', account);

    return (
      <div>
        <div className="item">
          <div className="item_icon">
            {this.image}
          </div>
          <div className="item_info">
            <div className="item_address">
              {account.info.address}
            </div>
            <div className="item_balance">
              {this.balance}
            </div>
          </div>
          <div className="item_net">
            <FontAwesome name="ellipsis-h" />
          </div>
        </div>
        <div className="actions">
          <div className="btn primary" onClick={this.handleBuy}>buy</div>
          <div className="btn primary" onClick={this.handleSend}>send</div>
        </div>
      </div>
    );

    return null;
  }
}

export default connect(
  state => ({
    accounts: state.balance.accounts,
    wallet: state.balance.wallet
  }),
)(AccountInfo);
