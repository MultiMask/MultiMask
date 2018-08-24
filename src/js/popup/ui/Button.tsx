import * as React from 'react';
import styled from 'react-emotion';
import { css } from 'emotion';

const dynamicStyle = props => css`
  width: ${props.fullWidth && '100%'};
  border: ${props.outlined && `1px solid ${props.theme.colors.primary}`};
  background-color: ${props.outlined && '#fff'};
  color: ${props.outlined && props.theme.colors.primary};
  box-shadow: ${props.outlined && 'none'};
`;

const ButtonBase = styled.button`
  color: white;
  border-radius: 4px;
  line-height: 16px;
  font-size: 13px;
  padding: 13px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  box-shadow: 10px 5px 40px 0px #b8cefd;
  border: none;
  cursor: pointer;
  ${dynamicStyle};
  ${props => props.small && SmallStyle};
  ${props => props.large && LargeStyle};
`;

const SmallStyle = css`
  line-height: 10px;
  font-size: 10px;
  padding: 7px 12px;
`;

const LargeStyle = css`
  padding: 7px 25px;
`;

const Button: React.SFC<any> = ({ children, ...props }) => {
  return (
    <ButtonBase {...props}>
      <span>{children}</span>
    </ButtonBase>
  );
};

Button.defaultProps = {
  fullWidth: false,
  outlined: false
};

export default Button;
