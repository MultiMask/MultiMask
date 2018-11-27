import * as React from 'react';
import FormLayout from './FormLayout';
import { css } from 'emotion';

import { Typography } from 'ui';

const styles = {
  text: css`
    font-size: 14px;
    margin-left: 5px;
  `,
  label: css`
    margin-bottom: 5px;
  `
};

class TypeImportingStep extends React.Component<any, any> {
  public state = {
    type: 'create'
  };

  public handleChange = event => {
    this.setState({ type: event.target.value });
  };

  public render () {
    const { onSubmit } = this.props;
    const { type } = this.state;
    return (
      <FormLayout onSubmit={() => onSubmit(type)} title="Choose variant:">
        <label className={styles.label}>
          <input onChange={this.handleChange} type="radio" value="create" name="create" checked={type === 'create'} />
          <Typography className={styles.text} color="main">
            Create Wallet
          </Typography>
        </label>
        <label className={styles.label}>
          <input onChange={this.handleChange} type="radio" value="import" name="import" checked={type === 'import'} />
          <Typography className={styles.text} color="main">
            Import Private Key
          </Typography>
        </label>
      </FormLayout>
    );
  }
}

export default TypeImportingStep;
