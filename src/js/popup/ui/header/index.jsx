import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "./header";

class Wrapper extends React.Component {
  render() {
    return (
      <div className="app-popup">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default connect(null)(Wrapper);
