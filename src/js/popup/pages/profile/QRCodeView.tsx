import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode = require('qrcode.react');
import styled from 'react-emotion';
import { withRouter } from 'react-router';

import Typography from '../../ui/Typography';

import profileActions from './../../actions/profile';

class QRCodeView extends React.Component<any, any> {
  public state = {
    profile: '',
    profileId: null
  };

  public componentDidMount() {
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

  public render() {
    const { profile } = this.state;

    return (
      <Container>
        <Typography align="center" color="main" variant="title">
          QR - code
        </Typography>
        {profile && <QRCode value={profile} renderAs="svg" size={310} />}
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
