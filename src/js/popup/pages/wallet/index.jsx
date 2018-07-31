import React from 'react';
import { connect } from 'react-redux';
import styled from 'react-emotion';

import ChooseNetwork from './chooseNetwork';
import CreateWallet from './create';
import ImportWallet from './import';
import Button from '../../ui/Button';
import Typography from '../../ui/Typography';

class WalletCreate extends React.Component {
  state = {
    step: 0
  };

  onSubmit = e => {
    const { step } = this.state;

    this.setState({ step: step });
  };

  handleChange = event => {
    this.setState({ step: event.target.value });
  };

  goBack = () => {
    this.setState({ step: 0 });
  };

  render() {
    if (this.state.step == 1) {
      return (
        <ChooseNetwork>
          <CreateWallet onBack={this.goBack} />
        </ChooseNetwork>
      );
    }

    if (this.state.step == 2) {
      return (
        <ChooseNetwork>
          <ImportWallet onBack={this.goBack} />
        </ChooseNetwork>
      );
    }

    return (
      <form onSubmit={this.onSubmit}>
        <Typography color="main" variant="title">
          Choose variant:
        </Typography>
        <label>
          <input onChange={this.handleChange} type="radio" value="1" name="step" />
          <Typography color="main">Create Wallet</Typography>
        </label>
        <label>
          <input onChange={this.handleChange} type="radio" value="2" name="step" />
          <Typography color="main">Import Seed Phrase</Typography>
        </label>
        <Button type="submit">Next</Button>
      </form>
    );
  }
}

export default connect()(WalletCreate);

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
