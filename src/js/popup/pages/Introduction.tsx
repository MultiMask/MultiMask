import * as React from 'react';
import styled from 'react-emotion';
import logo from 'img/logo.svg';
import Typography from 'ui/Typography';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import { PROFILE_CREATE } from 'constants/popupUrl';

const Header = styled('header')`
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

const Image = styled('img')`
  width: 90px;
`;

const BtnWrap = styled('div')`
  margin-top: 100px;
`;

const Introduction: React.SFC<{}> = () => (
  <Header>
    <Image alt="logo" src={logo} />
    <Typography color="main" variant="title">
      Welcome to MultiMask!
    </Typography>
    <Typography color="main" variant="">
      To continue you have to create profile
    </Typography>
    <BtnWrap>
      <Link to={PROFILE_CREATE}>
        <Button>Create Profile</Button>
      </Link>
    </BtnWrap>
  </Header>
);

export default Introduction;
