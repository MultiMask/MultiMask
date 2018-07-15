import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './../../actions/account';
import AccountFactory from './../../../models/account/accountFactory';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seed: null
    };
  }

  componentDidMount() {
    const { blockchain, network } = this.props;

    this.account = AccountFactory.create({ blockchain, network });

    this.setState({ seed: this.account.getSeed() });
  }

  handleSave = () => {
    this.props.create(this.account);
  };

  render() {
    return (
      <div className="creation">
        <div>
          <h3>Save seed save:</h3>
          <div>{this.state.seed}</div>
        </div>
        <button onClick={this.props.onBack} className="btn">
          Back
        </button>
        <button onClick={this.handleSave} className="login__create btn primary">
          I saved Seed
        </button>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch =>
    bindActionCreators(
      {
        create: actions.create
      },
      dispatch
    )
)(Wallet);
