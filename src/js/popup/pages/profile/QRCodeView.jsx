import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import styled from 'react-emotion';
import profileActions from './../../actions/profile';
import Typography from '../../ui/Typography';
import { withRouter } from 'react-router';

class QRCodeView extends Component {
  state = {
    profile: ''
  };

  componentDidMount() {
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

  render() {
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

export default withRouter(
  connect(
    null,
    dispatch => bindActionCreators(profileActions, dispatch)
  )(QRCodeView)
);

const Container = styled.div`
  padding: 20px;
`;
