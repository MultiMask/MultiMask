import * as React from 'react';
import networks from './../../../blockchain';
import SelectStep from './SelectStep';

export default class ChooseNetwork extends React.Component<any, any> {
  constructor (props) {
    super(props);

    this.state = {
      step: 0,
      selectedBlockchain: ''
    };
  }

  public handleBack = () => {
    this.setState({ step: 0 });
  };

  public handleNext = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  public handleSelectBlockchains = selectedItem => {
    this.setState({
      selectedBlockchain: selectedItem
    });
  };

  get blockchains () {
    const blocks = Object.entries(networks);
    return blocks.map((item, idx) => {
      const [sign, blockchain] = item;
      return this.getOption(blockchain);
    });
  }

  private getOption = item => {
    return { value: item.sign, label: item.name };
  };

  public render () {
    const { selectedBlockchain, step } = this.state;
    const { children, onBack } = this.props;

    if (step === 1) {
      return React.cloneElement(children as any, {
        blockchain: selectedBlockchain.value,
        onBack
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
      </React.Fragment>
    );
  }
}
