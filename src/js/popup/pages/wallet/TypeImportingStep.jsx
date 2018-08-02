import React, { Component } from 'react';
import FormLayout from './FormLayout';
import Typography from '../../ui/Typography';

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
        <label>
          <input onChange={this.handleChange} type="radio" value="create" name="create" checked={type === 'create'} />
          <Typography color="main">Create Wallet</Typography>
        </label>
        <label>
          <input onChange={this.handleChange} type="radio" value="import" name="import" checked={type === 'import'} />
          <Typography color="main">Import Seed Phrase</Typography>
        </label>
      </FormLayout>
    );
  }
}

export default TypeImportingStep;
