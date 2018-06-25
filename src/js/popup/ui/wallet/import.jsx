import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from './../../actions/account';
import AccountFactory from './../../../models/accountFactory';

class Wallet extends React.Component {
  state = {
    step: 1,
    network: 'bitcoin',
    seed: ''
  };

  handleSelect = e => {
    this.setState({ network: e.target.value });
  };

  handleInput = e => {
    this.setState({ seed: e.target.value });
  };

  handleDone = () => {
    this.setState({ step: 2 });
  };

  handleSave = () => {
    this.props.create(this.account);
  };

  render() {
    return (
      <div className="creation">
        {this.state.step === 1 && (
          <div>
            <div>
              <h4>Choose network:</h4>
              <select onChange={this.handleSelect} value={this.state.network}>
                <option value="bicoin">Bitcoin</option>
              </select>
            </div>
            <div>
              <button onClick={this.props.onBack} className="btn">
                Back
              </button>
              <button onClick={this.handleDone} className="login__create btn primary">
                create
              </button>
            </div>
          </div>
        )}
        {this.state.step === 2 && (
          <div>
            <div>
              <h3>Input seed:</h3>
              <input name="seed" type="text" value={this.state.seed} onChange={this.handleInput} />
            </div>
            <div>
              <button onClick={this.props.onBack} className="btn">
                Back
              </button>
              <button onClick={this.handleSave} className="login__create btn primary">
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators(actions, dispatch)
)(Wallet);
