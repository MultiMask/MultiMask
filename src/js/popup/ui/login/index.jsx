import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';
import TextField from '../TextField';
import Button from '../Button';
import authActions from '../../actions/auth';

const styles = {
  button: css`
    margin-top: 50px;
  `
};

class Auth extends React.Component {
  constructor(opts) {
    super(opts);

    this.state = {
      pass: '',
      error: ''
    };
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDone = e => {
    e.preventDefault();
    this.props.login(this.state.pass);
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleDone}>
          <TextField
            label="enter password"
            type="password"
            name="pass"
            onChange={this.handleInput}
            value={this.state.pass}
          />
          {this.props.error && <div className="login__error">Wrong password</div>}
          <Button className={styles.button} type="submit">
            Login
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default connect(
  ({ auth }) => ({
    error: auth.error
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)(Auth);
