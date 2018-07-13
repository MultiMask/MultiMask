import React from 'react';
import styled from 'react-emotion';

const InputContainer = styled.div`
  position: relative;
  background-color: inherit;
  width: ${props => props.fullWidth && '100%'};
`;

const Input = styled.input`
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

const Label = styled.label`
  position: absolute;
  color: ${props => props.theme.colors.secondary};
  top: -8px;
  left: 7px;
  padding: 0 4px;
  font-size: 10px;
  background-color: inherit;
`;

const Error = styled.div`
  display: ${props => (props.error ? 'block' : 'none')};
  color: ${props => props.theme.colors.error};
  font-size: 10px;
  text-align: left;
  padding-left: 13px;
  padding-top: 4px;
`;

const TextField = ({ className, label, name, error, fullWidth, ...props }) => {
  return (
    <InputContainer className={className} fullWidth>
      <Label for={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
      <Error error>{error}</Error>
    </InputContainer>
  );
};

TextField.defaultProps = {
  error: null,
  fullWidth: false
};

export default TextField;
