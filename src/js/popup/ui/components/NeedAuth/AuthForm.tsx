import * as React from 'react';
import TextField from '../../TextField';
import Button from '../../Button';
import Typography from '../../Typography';
import { css } from 'emotion';

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

const AuthForm: React.SFC<any> = ({ handleSubmit, error }) => (
  <form onSubmit={handleSubmit} className={styles.form}>
    <Typography color="main" variant="subheading" align="center">
      Confirm password:
    </Typography>
    <TextField className={styles.textField} name="password" label="Password" type="password" error={error} />
    <Button className={styles.button} type="submit" fullWidth>
      Check
    </Button>
  </form>
);

export default AuthForm;
