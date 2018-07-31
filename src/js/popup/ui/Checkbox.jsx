import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'react-emotion';

class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  onChange = e => {
    typeof this.props.onChange === 'function' && this.props.onChange(e);
  };

  render() {
    const { name, checked, label, onChange } = this.props;

    return (
      <Label>
        <CheckboxIcon>{checked ? <i className="far fa-check-square" /> : <i className="far fa-square" />}</CheckboxIcon>
        <Input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <CheckboxText>{label}</CheckboxText>
      </Label>
    );
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
  };
}

const Label = styled.label`
  font-size: 16px;
`;

const Input = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

const CheckboxIcon = styled.span`
  font-size: 18px;
  color: ${props => props.theme.colors[props.color] || props.theme.colors.primary};
`;

const CheckboxText = styled.span`
  display: inline-block;
  margin-left: 0.5em;
`;

export default Checkbox;