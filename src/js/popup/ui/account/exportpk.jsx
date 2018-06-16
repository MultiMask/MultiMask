import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ExportPK extends React.Component {
  render() {
    return <div>export PK</div>;
  }
}

export default connect(state => ({
  accounts: state.account.accounts,
  wallet: state.account.wallet
}))(ExportPK);
