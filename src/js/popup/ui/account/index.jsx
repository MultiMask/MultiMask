import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  STATE_VIEW_BUY,
  STATE_VIEW_SEND,
  STATE_VIEW_WALLET,
  STATE_VIEW_EXPORTPK
} from "./../../../constants/state";

import List from "./list";
import Details from "./details";
import Buy from "./buy";
import Send from "./send";
import ExportPK from "./exportpk";

class Account extends React.Component {
  render() {
    if (this.props.view === STATE_VIEW_BUY) {
      return (
        <div className="balance">
          <Buy />
        </div>
      );
    }

    if (this.props.view === STATE_VIEW_SEND) {
      return <Send />;
    }

    if (this.props.view === STATE_VIEW_WALLET) {
      return (
        <div className="balance">
          <Details />
        </div>
      );
    }

    if (this.props.view === STATE_VIEW_EXPORTPK) {
      return (
        <div className="balance">
          <ExportPK />
        </div>
      );
    }

    return <List />;
  }
}

export default connect(({ state }) => ({
  view: state.view
}))(Account);
