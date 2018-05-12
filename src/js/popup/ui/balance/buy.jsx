import React from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-fontawesome";

import networkImg from "../../../helpers/networkImg";
import networkSign from "../../../helpers/networkSign";

class Buy extends React.Component {
  render() {
    return <div>buy</div>;
  }
}

export default connect(state => ({
  accounts: state.balance.accounts,
  wallet: state.balance.wallet
}))(Buy);
