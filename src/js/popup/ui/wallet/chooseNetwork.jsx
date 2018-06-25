import React, { Component } from 'react';

import { processForm } from './../../helpers';
import networks from './../../../blockchain';

export default class ChooseNetwork extends Component {
  state = {
    step: 0
  };

  handleBack = () => {
    this.setState({ step: 0 });
  };

  handleBlockchain = e => {
    const data = processForm(e);

    this.setState({
      ...data,
      step: 1
    });
  };

  handleNetwork = e => {
    const data = processForm(e);

    this.setState({
      ...data,
      step: 2
    });
  };

  get blockchains() {
    return networks.map((blockchain, idx) => {
      return (
        <option value={blockchain.sign} key={idx}>
          {blockchain.name}
        </option>
      );
    });
  }

  get networks() {
    const blockchain = networks.find(item => item.sign === this.state.blockchain);
    return blockchain.network.map((item, idx) => {
      return (
        <option value={item.sign} key={idx}>
          {item.name}
        </option>
      );
    });
  }

  render() {
    if (this.state.step == 2) {
      return React.cloneElement(this.props.children, {
        blockchain: this.state.blockchain,
        network: this.state.network
      });
    }

    return (
      <div>
        {this.state.step == 0 && (
          <div>
            <form onSubmit={this.handleBlockchain}>
              <h4>Choose blockchain:</h4>
              <select onChange={this.handleInput} value={this.state.network} name="blockchain">
                {this.blockchains}
              </select>
              <div>
                <button onClick={this.props.onBack} className="btn">
                  Back
                </button>
                <button className="login__create btn primary" type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {this.state.step == 1 && (
          <div>
            <form onSubmit={this.handleNetwork}>
              <h4>Choose network:</h4>
              <select onChange={this.handleInput} value={this.state.network} name="network">
                {this.networks}
              </select>
              <div>
                <button onClick={this.handleBack} className="btn">
                  Back
                </button>
                <button className="login__create btn primary" type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
