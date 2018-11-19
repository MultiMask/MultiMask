import React, { Component } from 'react';
const DetectRTC = require('detectrtc');
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import QrReader from 'react-qr-reader';
import AuthForm from '../../ui/components/NeedAuth/AuthForm';
import profileActions from '../../actions/profile';
import routingActions from '../../actions/routing';
import { formToJson } from 'helpers/forms';
import styled from 'react-emotion';
import Typography from 'ui/Typography';
import Button from 'ui/Button';
import { readFile } from 'helpers/files';

class ImportProfile extends Component<any, {}> {
  public state = {
    encryptedProfile: null,
    delay: 500,
    isScan: false
  };
  public componentDidMount = () => {
    const setScan = isScan => {
      this.setState({ isScan });
    };
    DetectRTC.load(() => {
      setScan(DetectRTC.hasWebcam && DetectRTC.isWebsiteHasWebcamPermissions);
    });
  };
  public handleScan = encryptedProfile => {
    if (encryptedProfile) {
      this.setState({ encryptedProfile });
    }
  };

  public handleError = err => {
    console.error(err);
  };

  public handleUploadProfile = () => {
    const setEncryptedProfile = encryptedProfile => this.setState({ encryptedProfile });

    readFile(setEncryptedProfile);
  };

  public handleImportProfile = e => {
    e.preventDefault();
    const { handleImport } = this.props;
    const { encryptedProfile } = this.state;

    const pass = (formToJson(e.target) as any).password;

    handleImport(pass, encryptedProfile);
  };

  public handleOpenOptionsPage = () => {
    // TODO: go to profiles router. Fix this hack
    this.props.goBack();
    chrome.runtime.openOptionsPage(console.log('Option opened'));
  };

  public render () {
    const { encryptedProfile, delay, isScan } = this.state;

    if (!encryptedProfile) {
      return (
        <Container>
          <Typography align="center" color="main" variant="title">
            Scan QR code or upload your profile
          </Typography>
          {isScan && (
            <QrReader
              delay={delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%', marginBottom: 16 }}
            />
          )}
          <Footer>
            {!isScan && (
              <Button style={{ marginBottom: 12 }} onClick={this.handleOpenOptionsPage}>
                Scan qrcode
              </Button>
            )}
            <Button onClick={this.handleUploadProfile}>Upload</Button>
          </Footer>
        </Container>
      );
    }
    return <AuthForm handleSubmit={this.handleImportProfile} />;
  }
}

export default withRouter(connect(
  null,
  {
    handleImport: profileActions.import,
    goBack: routingActions.goBack
  }
)(ImportProfile) as any);

const Container = styled('div')`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Footer = styled('div')`
  margin-top: auto;
  display: flex;
  flex-direction: column;
`;
