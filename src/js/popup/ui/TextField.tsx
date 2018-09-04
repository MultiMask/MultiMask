import * as React from 'react';
import styled from 'react-emotion';

type fullWidth = { fullWidth: boolean; }
const InputContainer = styled('div')`
  position: relative;
  background-color: inherit;
  width: ${(props: fullWidth) => props.fullWidth && '100%'};
`;

const Input = styled('input')`
  border: 1px solid ${props => props.theme.colors.hint};
  box-shadow: ${props => props.theme.shadows[0]};
  width: 100%;
  outline: none;
  padding: 10px;
  height: 40px;
  font-size: 17px;
  box-sizing: border-box;
  background-color: inherit;
`;

type LabelProps = {
  theme?: any;
  htmlFor: string;
}
const Label = styled('label')`
  position: absolute;
  color: ${(props: LabelProps) => props.theme.colors.secondary};
  top: -8px;
  left: 7px;
  padding: 0 4px;
  font-size: 10px;
  background-color: inherit;
`;

type ErrorProps = { error: boolean }
const Error = styled('div')`
  display: ${(props: ErrorProps) => (props.error ? 'block' : 'none')};
  color: ${props => props.theme.colors.error};
  font-size: 10px;
  text-align: left;
  padding-left: 13px;
  padding-top: 4px;
`;

type TextFieldProps = {
  className?: string;
  label?: string;
  type?: string;
  name?: string;
  error?: any;
  value?: any;
  fullWidth?: boolean;
  onChange?: any;
  readOnly?: boolean;
  inputRef?: any;
  autoFocus?: any;
  onBlur?: any;
}
const TextField: React.SFC<TextFieldProps> = ({ className, label, name, error, fullWidth, inputRef, ...props }: any) => {
  return (
    <InputContainer className={className} fullWidth>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} ref={inputRef} name={name} {...props} />
      <Error error>{error}</Error>
    </InputContainer>
  );
};

TextField.defaultProps = {
  error: null,
  fullWidth: false
};

export default TextField;
