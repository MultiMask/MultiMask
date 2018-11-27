import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { css } from 'emotion';
import authActions from 'popup/actions/auth';

import TextField from 'ui/TextField';
import Button from 'ui/Button';
import Typography from 'ui/Typography';
import Splash from 'ui/SplashLoading';

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

interface IState {
  pass: string;
  loading: boolean;
}

class Auth extends React.Component<any, IState> {
  private input = React.createRef<any>();
  public state = {
    pass: '',
    loading: false
  };

  public componentDidMount () {
    this.input.current.focus();
  }

  public handleInput = e => {
    this.setState({ [e.target.name]: e.target.value } as IState);
  };

  public handleDone = e => {
    e.preventDefault();
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.login(this.state.pass);
      }
    );
  };

  public render () {
    return (
      <React.Fragment>
        <Typography color="main" variant="subheading" align="center">
          Login to your acccount
        </Typography>
        <form onSubmit={this.handleDone} className={styles.form}>
          <TextField
            inputRef={this.input}
            className={styles.textField}
            label="Enter password"
            type="password"
            name="pass"
            onChange={this.handleInput}
            value={this.state.pass}
            error={this.props.error ? 'Wrong password' : null}
            fullWidth
          />
          <Button fullWidth className={styles.button} type="submit">
            Login
          </Button>
        </form>
        <Splash show={this.state.loading} />
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
