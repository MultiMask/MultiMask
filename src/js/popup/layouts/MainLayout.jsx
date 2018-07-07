import React from 'react';
import styled from 'react-emotion';
import { BaseContainer } from './BaseContainer';

const Container = styled(BaseContainer)``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainLayout = ({ children }) => (
  <Container>
    <Header />
    {children}
  </Container>
);

export default MainLayout;
