import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import accountActions from "../../actions/account";
import stateActions from "../../actions/state";

import Item from "./item";
import Details from "./details";
import Buy from "./buy";
import Send from "./send";

class Account extends React.Component {
  chooseWallet = walletName => {
    this.props.setActive(walletName);
  };

  get items() {
    if (this.props.accounts && this.props.accounts.length > 0) {
      return this.props.accounts.map(accInfo => {
        return (
          <Item
            account={accInfo}
            key={accInfo.name}
            onChoose={this.chooseWallet}
          />
        );
      });
    }

    return null;
  }

  render() {
    // console.log("account.index props", this.props);

    if (this.props.buyView) {
      return (
        <div className="balance">
          <Buy />
        </div>
      );
    }

    if (this.props.sendView) {
      return (
        <div className="balance">
          <Send />
        </div>
      );
    }

    if (this.props.walletView) {
      return (
        <div className="balance">
          <Details account={this.choosenAccount} />
        </div>
      );
    }

    if (this.props.accounts !== null) {
      return <div className="balance">{this.items}</div>;
    }

    return <div>Loading...</div>;
  }
}

export default connect(
  state => ({
    accounts: state.account.accounts,
    walletView: state.account.wallet,
    buyView: state.account.buy,
    sendView: state.account.send
  }),
  dispatch =>
    bindActionCreators({ ...accountActions, ...stateActions }, dispatch)
)(Account);
