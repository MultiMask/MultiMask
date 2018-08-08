import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthForm from './AuthForm';
import needAuthActions from '../../../actions/ui/needauth';
import { formToJson } from './../../../helpers';

class NeedAuth extends React.Component {
  componentDidMount() {
    this.props.start();
  }

  componentWillUnmount() {
    this.props.start();
  }

  handleSubmit = e => {
    e.preventDefault();

    const json = formToJson(e.target);
    this.pass = json.password;

    this.props.check(this.pass);
  };

  render() {
    const { onSubmit, children, isAuth, error } = this.props;
    if (isAuth) {
      if (onSubmit) {
        onSubmit();
      } else {
        return React.cloneElement(children, { pass: this.pass });
      }
    }

    return <AuthForm handleSubmit={this.handleSubmit} error={error} />;
  }
}

NeedAuth.defaultProps = {
  onSubmit: null
};

export default connect(
  ({ ui }) => ({
    ...ui.needauth
  }),
  dispatch => bindActionCreators(needAuthActions, dispatch)
)(NeedAuth);
