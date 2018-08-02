import React from 'react';
import { connect } from 'react-redux';

import ChooseNetwork from './chooseNetwork';
import CreateWallet from './create';
import ImportWallet from './import';

import TypeImportingStep from './TypeImportingStep';

class WalletCreate extends React.Component {
  state = {
    type: ''
  };

  onNext = () => {
    const { step } = this.state;

    this.setState({ step: step });
  };

  handleChooseTypeImporting = type => {
    this.setState({ type });
  };

  handleChange = event => {
    this.setState({ step: event.target.value });
  };

  goBack = () => {
    this.setState({ type: '' });
  };

  render() {
    if (this.state.type === 'create') {
      return (
        <ChooseNetwork onBack={this.goBack}>
          <CreateWallet />
        </ChooseNetwork>
      );
    }

    if (this.state.type === 'import') {
      return (
        <ChooseNetwork onBack={this.goBack}>
          <ImportWallet />
        </ChooseNetwork>
      );
    }

    return <TypeImportingStep onSubmit={this.handleChooseTypeImporting} />;
  }
}

export default connect()(WalletCreate);
