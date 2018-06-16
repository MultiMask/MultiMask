import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import accountActions from "../../actions/account";
import stateActions from "../../actions/state";
import { getCurrentWallet } from "./../../select";

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

import TXS from "./txs";

class AccountInfo extends React.Component {
  state = {
    isViewMenu: false
  };

  handleBuy = () => {
    this.props.buy();
  };

  handleSend = () => {
    this.props.send();
  };

  handleMenu = () => {
    this.setState(state => ({
      ...state,
      isViewMenu: !state.isViewMenu
    }));
  };

  handleExportPK = () => {
    this.props.goExport();
  };

  get image() {
    const account = this.props.account;
    return <img src={networkImg(account)} />;
  }

  get balance() {
    const account = this.props.account;
    return `${account.info.balance} ${networkSign(account)}`;
  }

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
          <div className="item_net" onClick={this.handleMenu}>
            <FontAwesome name="ellipsis-h" />
          </div>
          {this.state.isViewMenu && (
            <div className="menu">
              <div className="menu__item" onClick={this.handleExportPK}>
                Export Private Key
              </div>
            </div>
          )}
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
  dispatch =>
    bindActionCreators(
      {
        buy: accountActions.buy,
        send: accountActions.send,
        goExport: stateActions.goExportPK
      },
      dispatch
    )
)(AccountInfo);
