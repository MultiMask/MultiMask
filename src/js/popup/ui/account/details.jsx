import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import actions from "../../actions/account";
import { getCurrentWallet } from "./../../select";

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

import TXS from "./txs";

class AccountInfo extends React.Component {
  get image() {
    const account = this.props.account;
    return <img src={networkImg(account)} />;
  }

  get balance() {
    const account = this.props.account;
    return `${account.info.balance} ${networkSign(account)}`;
  }

  handleBuy = () => {
    this.props.buy();
  };

  handleSend = () => {
    this.props.send();
  };

  render() {
    const account = this.props.account;

    return (
      <div>
        <div className="item">
          <div className="item_icon">{this.image}</div>
          <div className="item_info">
            <div className="item_address">{account.info.address}</div>
            <div className="item_balance">{this.balance}</div>
          </div>
          <div className="item_net">
            <FontAwesome name="ellipsis-h" />
          </div>
        </div>
        <div className="actions">
          {/* <div className="btn primary small" onClick={this.handleBuy}>
            buy
          </div> */}
          <div className="btn primary small" onClick={this.handleSend}>
            send
          </div>
        </div>
        <div>
          <TXS account={account} />
        </div>
      </div>
    );

    return null;
  }
}

export default connect(
  state => ({
    account: getCurrentWallet(state)
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(AccountInfo);
