import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import stateActions from "../../../actions/state";

import Item from "./item";

class AccountList extends React.Component {
  get items() {
    if (this.props.accounts && this.props.accounts.length > 0) {
      return this.props.accounts.map(account => {
        return <Item account={account} key={account.name} />;
      });
    }

    return (
      <div className="balance__empty">
        <div className="title">
          <span>No walletes</span>
        </div>
        <div className="action">
          <div onClick={this.props.createWallet}>Create new</div>
        </div>
      </div>
    );
  }

  render() {
    return <div className="balance">{this.items}</div>;
  }
}

export default connect(
  ({ account }) => ({
    accounts: account.accounts
  }),
  dispatch => bindActionCreators(stateActions, dispatch)
)(AccountList);
