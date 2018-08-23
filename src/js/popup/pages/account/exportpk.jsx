import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NeedAuth from '../../ui/components/NeedAuth';
import { getCurrentWallet } from '../../select';
import actions from './../../actions/account';

import { decode, hidePass } from './../../../libs/cipher';

class ExportPK extends React.Component {
  state = {
    seed: ''
  };

  componentDidMount() {
    const { getSeed, pass, wallet } = this.props;

    getSeed(pass, wallet.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pass && nextProps.seed) {
      return {
        seed: decode(nextProps.pass, nextProps.seed)
      };
    }

    return {
      seed: ''
    };
  }

  render() {
    return (
      <div className="balance">
        <NeedAuth>
          <div>
            <h1>export PK</h1>
            <h2>{this.state.seed}</h2>
          </div>
        </NeedAuth>
      </div>
    );
  }
}

export default connect(
  state => ({
    wallet: getCurrentWallet(state),
    seed: state.account.seed
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(ExportPK);
