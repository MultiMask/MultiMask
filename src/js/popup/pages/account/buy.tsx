import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Buy extends React.Component {
  render() {
    return <div>buy</div>;
  }
}

export default connect((state: any) => ({
  accounts: state.account.accounts,
  wallet: state.account.wallet
}))(Buy);
