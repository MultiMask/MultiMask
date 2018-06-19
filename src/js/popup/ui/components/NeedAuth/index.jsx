import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import needAuthActions from '../../../actions/ui/needauth';

class NeedAuth extends React.Component {

  componentWillMount() {
    this.props.start();
  }

  handleSubmit = e => {
    e.preventDefault();

    const json = formToJson(new FormData(e.target));
    this.pass = json.password;

    this.props.check(this.pass);
  }

  render() {
    if (this.props.isAuth) {
      return React.cloneElement(this.props.children, { pass: this.pass });
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Confirm password:</h1>
          <input name="password" placeholder="password" type="password" />
          <button type="submit">Check</button>
        </form>
        <div>{this.props.error}</div>
      </div>
    )
  }
}

export default connect(({ ui }) => ({
  ...ui.needauth
}), dispatch => bindActionCreators(needAuthActions, dispatch))(NeedAuth);

const formToJson = form => {
  let object = {};

  form.forEach((value, key) => {
    object[key] = value;
  });

  return object;
}
