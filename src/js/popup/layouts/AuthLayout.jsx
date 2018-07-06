import React from 'react';
import styled from 'react-emotion';
import logo from '../../../img/logo.png';
import label from '../../../img/label.svg';

const Container = styled.div`
  width: 450px;
  height: 600px;
  padding: 0 55px;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  text-align: center;
  padding-top: 100px;
  flex-direction: column;
`;

const Image = styled('img')`
  margin-top: ${props => (props.default ? '16px' : 0)};
`;

const AuthLayout = ({ children }) => (
  <Container>
    <Header>
      <Image alt="logo" src={logo} />
      <Image default src={label} />
      <h4>Login to your acccount</h4>
    </Header>
    {children}
  </Container>
);

AuthLayout.defaultProps = {
  default: false
};

export default AuthLayout;
