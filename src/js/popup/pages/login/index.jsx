import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';
import TextField from '../../ui/TextField';
import Button from '../../ui/Button';
import Typography from '../../ui/Typography';
import authActions from '../../actions/auth';

const styles = {
  textField: css`
    margin-top: 20px;
  `,
  button: css`
    margin-top: 30px;
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
        <Typography color="main" variant="subheading" align="center">
          Login to your acccount
        </Typography>
        <form onSubmit={this.handleDone}>
          <TextField
            className={styles.textField}
            label="Enter password"
            type="password"
            name="pass"
            onChange={this.handleInput}
            value={this.state.pass}
          />
          {this.props.error && <div className="login__error">Wrong password</div>}
          <Button fullWidth className={styles.button} type="submit">
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
