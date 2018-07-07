import React from 'react';
import { connect } from 'react-redux';

import { processForm } from './../../helpers';

import ChooseNetwork from './chooseNetwork';
import CreateWallet from './create';
import ImportWallet from './import';

class WalletCreate extends React.Component {
  state = {
    step: 0
  };

  onSubmit = e => {
    const data = processForm(e);

    this.setState({ step: data.step });
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
      <div className="creation">
        <form onSubmit={this.onSubmit}>
          <div>
            <label>
              <input type="radio" value="1" name="step" />
              Create Wallet
            </label>
          </div>
          <div>
            <label>
              <input type="radio" value="2" name="step" />
              Import Seed Phrase
            </label>
          </div>
          {/* <div>
            <label>
              <input type="radio" value="3" name="step" />
              Import Private Key
            </label>
          </div> */}
          <div>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(WalletCreate);
