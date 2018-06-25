import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import needAuthActions from '../../../actions/ui/needauth';
import { formToJson } from './../../../helpers';

class NeedAuth extends React.Component {
  componentDidMount() {
    this.props.start();
  }

  handleSubmit = e => {
    e.preventDefault();

    const json = formToJson(e.target);
    this.pass = json.password;

    this.props.check(this.pass);
  };

  render() {
    if (this.props.isAuth) {
      return React.cloneElement(this.props.children, { pass: this.pass });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Confirm password:</div>
          <input name="password" placeholder="password" type="password" />
          <button type="submit">Check</button>
        </form>
        <div>{this.props.error}</div>
      </div>
    );
  }
}

export default connect(
  ({ ui }) => ({
    ...ui.needauth
  }),
  dispatch => bindActionCreators(needAuthActions, dispatch)
)(NeedAuth);
