import React, { Component } from 'react';
import networks from './../../../blockchain';
import FormLayout from './FormLayout';
import Select from '../../ui/Select';

export default class ChooseNetwork extends Component {
  state = {
    step: 0,
    selectedBlockchain: '',
    selectedNetwork: ''
  };

  handleBack = () => {
    this.setState({ step: 0 });
  };

  handleNext = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  handleSelectBlockchains = selectedItem => {
    this.setState({ selectedBlockchain: selectedItem });
  };

  handleSelectNetwork = selectedItem => {
    this.setState({ selectedNetwork: selectedItem });
  };

  getOption = item => {
    return { value: item.sign, label: item.name };
  };

  get blockchains() {
    const blocks = Object.entries(networks);
    return blocks.map((item, idx) => {
      const [sign, blockchain] = item;
      return this.getOption(blockchain);
    });
  }

  get networks() {
    const blockchain = networks[this.state.selectedBlockchain.value];
    return blockchain.network.map((item, idx) => {
      return this.getOption(item);
    });
  }

  render() {
    const { selectedBlockchain, selectedNetwork, step } = this.state;
    const { children, onBack } = this.props;

    if (step === 2) {
      return React.cloneElement(children, {
        blockchain: selectedBlockchain.value,
        network: selectedNetwork.value,
        onBack: onBack
      });
    }

    return (
      <React.Fragment>
        {step === 0 && (
          <FormLayout onSubmit={this.handleNext} title="Choose blockchain:" onBack={this.props.onBack}>
            <Select options={this.blockchains} value={selectedBlockchain} onChange={this.handleSelectBlockchains} />
          </FormLayout>
        )}
        {step === 1 && (
          <FormLayout onSubmit={this.handleNext} title="Choose network:" onBack={this.handleBack}>
            <Select options={this.networks} onChange={this.handleSelectNetwork} value={selectedNetwork} />
          </FormLayout>
        )}
      </React.Fragment>
    );
  }
}
