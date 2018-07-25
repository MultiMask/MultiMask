import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '../../TextField';
import Button from '../../Button';
import Typography from '../../Typography';
import { css } from 'emotion';

import needAuthActions from '../../../actions/ui/needauth';
import { formToJson } from './../../../helpers';

const styles = {
  form: css`
    padding: 20px;
  `,
  textField: css`
    margin-top: 20px;
  `,
  button: css`
    margin-top: 30px;
  `
};
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
    const { onSubmit, children, isAuth, error } = this.props;
    if (isAuth) {
      if (onSubmit) {
        onSubmit();
      } else {
        return React.cloneElement(children, { pass: this.pass });
      }
    }

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <Typography color="main" variant="subheading" align="center">
          Confirm password:
        </Typography>
        <TextField className={styles.textField} name="password" label="Password" type="password" error={error} />
        <Button className={styles.button} type="submit" fullWidth>
          Check
        </Button>
      </form>
    );
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
