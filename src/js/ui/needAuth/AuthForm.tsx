import * as React from 'react';
import { css } from 'emotion';

import { TextField, Button, Typography } from '../.';

const styles = {
  form: css`
    padding: 20px;
    max-width: 400px;
    margin: auto;
  `,
  textField: css`
    margin-top: 20px;
  `,
  button: css`
    margin-top: 30px;
  `
};

export const AuthForm: React.SFC<any> = ({ handleSubmit, error, className }) => (
  <form onSubmit={handleSubmit} className={`${styles.form} ${className}`}>
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
