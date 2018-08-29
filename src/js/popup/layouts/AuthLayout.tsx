import * as React from 'react';
import styled from 'react-emotion';
import logo from '../../../img/logo.svg';
import Typography from '../ui/Typography';

import { BaseContainer } from './BaseContainer';

const Container = styled(BaseContainer)`
  padding: 20px;
`;

type HeaderProps = {
  login?: boolean;
}
const Header = styled.header`
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: ${(props: HeaderProps) => (props.login ? '50px' : 0)};
  flex-direction: column;
`;

const Image = styled('img')`
  width: 90px;
`;

type AuthLayoutProps = {
  login?: boolean;
}
const AuthLayout: React.SFC<AuthLayoutProps> = ({ children }) => (
  <Container>
    <Header>
      <Image alt="logo" src={logo} />
      <Typography color="main" variant="title">
        MultiMask
      </Typography>
    </Header>
    {children}
  </Container>
);

AuthLayout.defaultProps = {
  login: false
};

export default AuthLayout;
