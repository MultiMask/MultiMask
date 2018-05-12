import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import actions from "../actions/balance";

class Header extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.actions = bindActionCreators(actions, dispatch);
  }

  handleBack = () => {
    console.log("back");
    this.actions.back();
  };

  get showBack() {
    const { wallet, buy, send } = this.props;

    return !!wallet || buy || send;
  }

  render() {
    return (
      <div className="header">
        {this.showBack && (
          <div className="header_back">
            <FontAwesome name="chevron-left" onClick={this.handleBack} />
          </div>
        )}
        <div className="header_add">
          <FontAwesome name="plus-circle" onClick={this.props.onCreate} />
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  accounts: state.balance.accounts,
  wallet: state.balance.wallet,
  buy: state.balance.buy,
  send: state.balance.send
}))(Header);
