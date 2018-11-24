import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentWallet } from '../../select';
import actions from './../../actions/account';

import { decode } from './../../../libs/cipher';

class ExportPK extends React.Component<any, any> {
  public state = {
    seed: ''
  };

  public componentDidMount() {
    const { getSeed, pass, wallet } = this.props;

    getSeed(pass, wallet.id);
  }

  public static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pass && nextProps.seed) {
      return {
        seed: decode(nextProps.pass, nextProps.seed)
      };
    }

    return {
      seed: ''
    };
  }

  public render() {
    return (
      <div className="balance">
        <div>
          <h1>export PK</h1>
          <h2>{this.state.seed}</h2>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    wallet: getCurrentWallet(state),
    seed: state.account.seed
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(ExportPK);
