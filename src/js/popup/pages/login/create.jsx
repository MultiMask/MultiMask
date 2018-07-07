import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';

import TextField from '../../ui/TextField';
import Button from '../../ui/Button';

import authActions from '../../actions/auth';

const styles = {
  textField: css`
    margin: 44px 0 33px 0;
  `,
  button: css`
    margin-top: 60px;
  `
};

class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate(this.state);

    if (Object.keys(errors).length === 0) {
      this.props.init(this.state.password);
      this.props.success();
    } else {
      this.setState({ errors });
    }
  };

  validate = values => {
    const errors = {};

    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Password mismatched';
    }

    return errors;
  };

  render() {
    const {
      password,
      errors: { password: passwordError, confirmPassword: confirmPasswordError },
      confirmPassword
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          className={styles.textField}
          label="New Password"
          type="password"
          name="password"
          onChange={this.handleInput}
          value={password}
          error={passwordError}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={this.handleInput}
          value={confirmPassword}
          error={confirmPasswordError}
        />
        <Button className={styles.button} type="submit">
          Create
        </Button>
      </form>
    );
  }
}

export default connect(
  () => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)(Auth);
