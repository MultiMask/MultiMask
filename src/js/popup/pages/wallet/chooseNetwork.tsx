import * as React from 'react';
import networks from './../../../blockchain';
import SelectStep from './SelectStep';

export default class ChooseNetwork extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      selectedBlockchain: '',
      selectedNetwork: ''
    };
  }

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
    this.setState({
      selectedBlockchain: selectedItem,
      selectedNetwork: ''
    });
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
      return React.cloneElement(children as any, {
        blockchain: selectedBlockchain.value,
        network: selectedNetwork.value,
        onBack: onBack
      });
    }

    return (
      <React.Fragment>
        {step === 0 && (
          <SelectStep
            onSubmit={this.handleNext}
            title="Choose blockchain:"
            onBack={this.props.onBack}
            onChange={this.handleSelectBlockchains}
            options={this.blockchains}
            selectedValue={selectedBlockchain}
          />
        )}
        {step === 1 && (
          <SelectStep
            onSubmit={this.handleNext}
            title="Choose network:"
            onBack={this.handleBack}
            onChange={this.handleSelectNetwork}
            options={this.networks}
            selectedValue={selectedNetwork}
          />
        )}
      </React.Fragment>
    );
  }
}
