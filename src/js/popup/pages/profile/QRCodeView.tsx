import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode = require('qrcode.react');
import styled from 'react-emotion';
import { withRouter } from 'react-router';

import { Typography } from 'ui';

import profileActions from 'popup/actions/profile';

class QRCodeView extends React.Component<any, any> {
  public state = {
    profile: '',
    profileId: null
  };

  public componentDidMount () {
    const {
      getProfile,
      match: {
        params: { id }
      }
    } = this.props;

    getProfile(id).then(profile => {
      this.setState({ profile });
    });
  }

  public render () {
    const { profile } = this.state;

    return (
      <Container>
        <Typography align="center" color="main" variant="title">
          QR - code
        </Typography>
        {profile && <QRCode value={profile} renderAs="svg" size={310} />}
        <Typography align="center" color="main" variant="body1">
          Scan this code by MultiMask Mobile to import profile
        </Typography>
      </Container>
    );
  }
}

export default withRouter(connect(
  null,
  profileActions
)(QRCodeView) as any);

const Container = styled('div')`
  padding: 20px;
`;
