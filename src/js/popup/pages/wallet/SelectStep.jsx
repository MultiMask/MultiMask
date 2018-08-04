import React, { Component } from 'react';
import FormLayout from './FormLayout';
import Select from '../../ui/Select';

class SelectStep extends Component {
  constructor(props) {
    super(props);
    const { options, selectedValue } = this.props;
    const item = selectedValue ? selectedValue : options[0];
    this.state = {
      selectedItem: item
    };
  }

  componentDidMount() {
    const { options, selectedValue, onChange } = this.props;
    if (!selectedValue) {
      onChange(options[0]);
    }
  }

  handleChange = event => {
    this.setState({ selectedItem: event });
    this.props.onChange(event);
  };

  render() {
    const { options, onChange, ...props } = this.props;
    const { selectedItem } = this.state;
    return (
      <FormLayout {...props}>
        <Select options={options} value={selectedItem} onChange={this.handleChange} />
      </FormLayout>
    );
  }
}

export default SelectStep;
