import * as React from 'react';
import styled from 'react-emotion';

interface IFullWidth {
  fullWidth: boolean;
}
const InputContainer = styled('div')`
  position: relative;
  background-color: inherit;
  width: ${(props: IFullWidth) => props.fullWidth && '100%'};
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

interface ILabelProps {
  theme?: any;
  htmlFor: string;
}
const Label = styled('label')`
  position: absolute;
  color: ${(props: ILabelProps) => props.theme.colors.secondary};
  top: -8px;
  left: 7px;
  padding: 0 4px;
  font-size: 10px;
  background-color: inherit;
`;

interface IErrorProps {
  error: boolean;
}
const Error = styled('div')`
  display: ${(props: IErrorProps) => (props.error ? 'block' : 'none')};
  color: ${props => props.theme.colors.error};
  font-size: 10px;
  text-align: left;
  padding-left: 13px;
  padding-top: 4px;
`;

interface ITextFieldProps {
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
const TextField: React.SFC<ITextFieldProps> = ({
  className,
  label,
  name,
  error,
  fullWidth,
  inputRef,
  ...props
}: any) => {
  return (
    <InputContainer className={className} fullWidth>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} innerRef={inputRef} name={name} {...props} />
      <Error error>{error}</Error>
    </InputContainer>
  );
};

TextField.defaultProps = {
  error: null,
  fullWidth: false
};

export default TextField;
