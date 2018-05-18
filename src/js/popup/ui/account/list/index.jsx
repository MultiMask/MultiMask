import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import accountActions from "../../../actions/account";

import Item from "./item";

class AccountList extends React.Component {
  get items() {
    if (this.props.accounts && this.props.accounts.length > 0) {
      return this.props.accounts.map(account => {
        return <Item account={account} key={account.name} />;
      });
    }

    return null;
  }

  render() {
    return <div className="balance">{this.items}</div>;
  }
}

export default connect(({ account }) => ({
  accounts: account.accounts
}))(AccountList);
