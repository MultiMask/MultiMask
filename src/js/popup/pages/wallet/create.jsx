import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormLayout from './FormLayout';
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
    this.props.create(this.account.serialize());
  };

  render() {
    return (
      <FormLayout
        onSubmit={this.handleSave}
        title="Save seed save:"
        onBack={this.props.onBack}
        submitButtonTitle="I saved Seed"
      >
        <div>{this.state.seed}</div>
      </FormLayout>
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
