import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import actions from "../actions/state";

import Header from "./header";

class Wrapper extends React.Component {
  onCreate = () => {
    this.props.createWallet();
  }

  render() {
    return (
      <div>
        <Header
          onCreate={this.onCreate}
        />
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, dispatch => bindActionCreators(actions, dispatch))(Wrapper);
