import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCurrentWallet } from '../../select';
import actions from './../../actions/account';

class ExportPK extends React.Component {

  componentDidMount() {
    const { getSeed, pass, wallet } = this.props;

    getSeed(pass, wallet.name);
  }

  render() {
    return <div>
      <h1>
        export PK
        </h1>
      <h2>
        {this.props.seed}
      </h2>
    </div>;
  }
}

export default connect(
  state => ({
    wallet: getCurrentWallet(state),
    seed: state.account.seed
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(ExportPK);
