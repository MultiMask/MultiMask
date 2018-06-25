import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './../../actions/account';
import AccountFactory from './../../../models/accountFactory';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      network: 'bitcoin',
      seed: null
    };
  }

  componentDidMount() {
    const { blockchain, network } = this.props;
    console.log('CHAIN', blockchain, network);

    this.account = AccountFactory.create({ network: this.state.network });
    const seed = this.account.create();

    this.setState({ step: 2, seed });
  }

  handleSave = () => {
    this.props.create(this.account);
  };

  render() {
    console.log('create props', this.props);

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
