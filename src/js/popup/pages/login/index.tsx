import * as React from 'react';
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
  `,
  form: css`
    background-color: inherit;
  `
};

class Auth extends React.Component<any, any> {
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
        <form onSubmit={this.handleDone} className={styles.form}>
          <TextField
            className={styles.textField}
            label="Enter password"
            type="password"
            name="pass"
            onChange={this.handleInput}
            value={this.state.pass}
            error={this.props.error}
            fullWidth
          />
          <Button fullWidth className={styles.button} type="submit">
            Login
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default connect(
  ({ auth }: any) => ({
    error: auth.error
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)(Auth);
