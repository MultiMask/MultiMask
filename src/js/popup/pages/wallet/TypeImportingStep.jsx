import React, { Component } from 'react';
import FormLayout from './FormLayout';
import Typography from '../../ui/Typography';
import { css } from 'emotion';

const styles = {
  text: css`
    font-size: 14px;
    margin-left: 5px;
  `,
  label: css`
    margin-bottom: 5px;
  `
};

class TypeImportingStep extends Component {
  state = {
    type: 'create'
  };

  handleChange = event => {
    this.setState({ type: event.target.value });
  };

  render() {
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
            Import Seed Phrase
          </Typography>
        </label>
      </FormLayout>
    );
  }
}

export default TypeImportingStep;
