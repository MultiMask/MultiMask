import React from 'react';
import styled from 'react-emotion';
import logo from '../../../img/logo.png';
import label from '../../../img/label.svg';
import Typography from '../ui/Typography';

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
  padding-top: ${props => (props.login ? '100px' : '50px')};
  flex-direction: column;
`;

const Image = styled('img')`
  margin-top: 16px};
`;

const AuthLayout = ({ login, children }) => (
  <Container>
    <Header>
      <Image alt="logo" src={logo} />
      <Image alt="label" src={label} />
      <Typography color="main" variant="title">
        {login ? 'Login to your acccount' : 'Create new account'}
      </Typography>
    </Header>
    {children}
  </Container>
);

AuthLayout.defaultProps = {
  login: false
};

export default AuthLayout;
