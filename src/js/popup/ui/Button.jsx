import React from 'react';
import styled from 'react-emotion';

const ButtonBase = styled.button`
  color: white;
  border-radius: 4px;
  width: 100%;
  line-height: 16px;
  font-size: 13px;
  padding: 13px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 10px 5px 40px 0px #b8cefd;
  border: none;
`;

const Button = ({ children, ...props }) => {
  return (
    <ButtonBase {...props}>
      <span>{children}</span>
    </ButtonBase>
  );
};

export default Button;
