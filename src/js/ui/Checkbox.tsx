import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'react-emotion';

export class Checkbox extends React.Component<any, any> {
  constructor (props) {
    super(props);
  }

  public onChange = e => {
    typeof this.props.onChange === 'function' && this.props.onChange(e);
  };

  public render () {
    const { name, checked, label, onChange } = this.props;

    return (
      <Label>
        <CheckboxIcon>{checked ? <i className="far fa-check-square" /> : <i className="far fa-square" />}</CheckboxIcon>
        <Input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <CheckboxText>{label}</CheckboxText>
      </Label>
    );
  }

  public static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
  };
}

const Label = styled('label')`
  font-size: 16px;
`;

const Input = styled('input')`
  position: absolute;
  z-index: -1;
  opacity: 0;
`;

interface ICheckboxIconProps {
  theme?: any;
  color?: string;
}
const CheckboxIcon = styled('span')`
  font-size: 18px;
  color: ${(props: ICheckboxIconProps) => props.theme.colors[props.color] || props.theme.colors.primary};
`;

const CheckboxText = styled('span')`
  display: inline-block;
  margin-left: 0.5em;
`;

export default Checkbox;
