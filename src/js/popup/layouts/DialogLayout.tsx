import * as React from 'react';
import styled from 'react-emotion';
import logo from '../../../img/logo.svg';
import Typography from '../ui/Typography';

import { BaseContainer } from './BaseContainer';

const Container = styled(BaseContainer)`
  padding: 20px;
  height: 600px;
`;

const Header = styled('header')`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const Image = styled('img')`
  width: 90px;
`;

const DialogLayout: React.SFC<any> = ({ children }) => (
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

export default DialogLayout;
