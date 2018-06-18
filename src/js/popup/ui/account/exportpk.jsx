import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NeedAuth from './../components/NeedAuth';

class ExportPK extends React.Component {
  render() {
    return <div>
      <NeedAuth>
        <h1>
          export PK
        </h1>
      </NeedAuth>
    </div>;
  }
}

export default connect(state => ({
  accounts: state.account.accounts,
  wallet: state.account.wallet
}))(ExportPK);
