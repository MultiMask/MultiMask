import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import { STATE_VIEW_MAIN } from "../../../constants/state";

import actions from "../../actions/account";

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
    return !!wallet || buy || (send && this.props.view !== STATE_VIEW_MAIN);
  }

  render() {
    console.log("header props", this.props);
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

export default connect(({ account, state }) => ({
  view: state.view,
  accounts: account.accounts,
  wallet: account.wallet,
  buy: account.buy,
  send: account.send,
  creation: state.creation
}))(Header);
