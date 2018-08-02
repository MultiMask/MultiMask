import React, { Component } from 'react';

import { processForm } from './../../helpers';
import networks from './../../../blockchain';
import FormLayout from './FormLayout';

export default class ChooseNetwork extends Component {
  state = {
    step: 0
  };

  handleBack = () => {
    this.setState({ step: 0 });
  };

  handleBlockchain = e => {
    this.setState({
      ...processForm(e),
      step: 1
    });
  };

  handleNetwork = e => {
    this.setState({
      ...processForm(e),
      step: 2
    });
  };

  get blockchains() {
    const blocks = Object.entries(networks);
    return blocks.map((item, idx) => {
      const [sign, blockchain] = item;

      return (
        <option value={blockchain.sign} key={idx}>
          {blockchain.name}
        </option>
      );
    });
  }

  get networks() {
    const blockchain = networks[this.state.blockchain];
    return blockchain.network.map((item, idx) => {
      return (
        <option value={item.sign} key={idx}>
          {item.name}
        </option>
      );
    });
  }

  render() {
    if (this.state.step === 2) {
      return React.cloneElement(this.props.children, {
        blockchain: this.state.blockchain,
        network: this.state.network,
        onBack: this.props.onBack
      });
    }

    return (
      <React.Fragment>
        {this.state.step === 0 && (
          <FormLayout onSubmit={this.handleBlockchain} title="Choose blockchain:" onBack={this.props.onBack}>
            <select onChange={this.handleInput} value={this.state.network} name="blockchain">
              {this.blockchains}
            </select>
          </FormLayout>
        )}
        {this.state.step === 1 && (
          <FormLayout onSubmit={this.handleNetwork} title="Choose network:" onBack={this.handleBack}>
            <select onChange={this.handleInput} value={this.state.network} name="network">
              {this.networks}
            </select>
          </FormLayout>
        )}
      </React.Fragment>
    );
  }
}
