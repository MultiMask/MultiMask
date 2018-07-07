import React from 'react';
import styled from 'react-emotion';

const ButtonBase = styled.button`
  color: white;
  border-radius: 4px;
  width: 100%;
  line-height: 22px;
  font-size: 17px;
  padding: 16px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 10px 5px 40px 0px #b8cefd;
`;

const Button = ({ children, ...props }) => {
  return (
    <ButtonBase {...props}>
      <span>{children}</span>
    </ButtonBase>
  );
};

export default Button;
