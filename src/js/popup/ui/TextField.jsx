import React from 'react';
import styled from 'react-emotion';

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: 1px solid ${props => props.theme.colors.secondary};
  box-shadow: ${props => props.theme.shadows[0]};
  width: 100%;
  outline: none;
  padding: 10px;
  height: 50px;
  font-size: 26px;
  box-sizing: border-box;
`;

const Label = styled.label`
  position: absolute;
  color: ${props => props.theme.colors.secondary};
  top: -8px;
  left: 7px;
  padding: 0 4px;
  background-color: white;
`;

const TextField = ({ label, name, ...props }) => {
  return (
    <InputContainer>
      <Label for={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
    </InputContainer>
  );
};

export default TextField;
