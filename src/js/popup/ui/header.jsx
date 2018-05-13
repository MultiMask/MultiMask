import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import actions from "../actions/account";

class Header extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    this.actions = bindActionCreators(actions, dispatch);
  }

  handleBack = () => {
    this.actions.back();
  };

  get showBack() {
    // TODO: refactor here
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
        {!this.props.creation && (
          <div className="header_add">
            <FontAwesome name="plus-circle" onClick={this.props.onCreate} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  accounts: state.account.accounts,
  wallet: state.account.wallet,
  buy: state.account.buy,
  send: state.account.send,
  creation: state.state.creation
}))(Header);
