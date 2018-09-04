import * as React from 'react';
import styled from 'react-emotion';
import Typography from './Typography';

const Item = styled(Typography)`
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Root = styled('div')`
  border-radius: 2px;
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.hint};
  }
`;

const MenuItem = props => {
  const { children, theme, component: Component, ...other } = props;
  if (Component) {
    return (
      <Component style={{ textDecoration: 'none' }} {...other}>
        <Root>
          <Item color="main">{children}</Item>
        </Root>
      </Component>
    );
  }

  return (
    <Root {...other}>
      <Item color="main">{children}</Item>
    </Root>
  );
};

export default MenuItem;
