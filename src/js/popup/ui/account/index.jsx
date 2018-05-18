import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import accountActions from "../../actions/account";
import stateActions from "../../actions/state";

import List from "./list";
import Details from "./details";
import Buy from "./buy";
import Send from "./send";

class Account extends React.Component {
  render() {
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

    return <List />;
  }
}

export default connect(state => ({
  walletView: state.account.wallet,
  buyView: state.account.buy,
  sendView: state.account.send
}))(Account);
