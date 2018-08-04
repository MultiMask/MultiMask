import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import styled from 'react-emotion';
import profileActions from './../../actions/profile';
import Typography from '../../ui/Typography';

class QRCodeView extends Component {
  state = {
    profile: ''
  };

  componentDidMount() {
    const { getProfile, profileId } = this.props;

    getProfile(profileId).then(profile => {
      this.setState({ profile });
    });
  }

  render() {
    const { profile, profileId } = this.state;

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

export default connect(
  null,
  dispatch => bindActionCreators(profileActions, dispatch)
)(QRCodeView);

const Container = styled.div`
  padding: 20px;
`;
