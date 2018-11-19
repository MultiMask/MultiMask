import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import QrReader from 'react-qr-reader';
import styled from 'react-emotion';
import '../css/options.less';

import { theme } from './config/theme';

import InternalMessage from 'services/InternalMessage';
import { PROFILE_IMPORT_QRCODE } from 'constants/profile';
import AuthForm from 'ui/components/NeedAuth/AuthForm';
import { formToJson } from 'helpers/forms';
import Button from 'ui/Button';
import Typography from 'ui/Typography';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled('div')`
  width: 500px;
  height: 500px;
`;

class ImportProfile extends React.Component<any, {}> {
  public state = {
    encryptedProfile: null,
    delay: 500,
    done: false
  };
  public componentDidMount () {}
  public handleScan = encryptedProfile => {
    if (encryptedProfile) {
      this.setState({
        encryptedProfile
      });
    }
  };

  public handleImportProfile = e => {
    e.preventDefault();
    const { encryptedProfile } = this.state;

    const pass = (formToJson(e.target) as any).password;

    InternalMessage.payload(PROFILE_IMPORT_QRCODE, { payload: { encryptedProfile, pass } })
      .send()
      .then(response => {
        if (response.success) {
          this.setState({ done: true });
        }

        console.log(response);
      });
  };

  public handleClose = () => {
    chrome.tabs.getCurrent(function (tab) {
      chrome.tabs.remove(tab.id);
    });
  };

  public handleError = err => {
    console.error(err);
  };

  public render () {
    const { encryptedProfile, delay, done } = this.state;
    if (done) {
      return (
        <Wrapper>
          <Typography color="main" variant="headline" align="center">
            Import Succes!
          </Typography>
          <Typography color="main" variant="subheading" align="center">
            Close page and reopen extension.
          </Typography>
          <Button onClick={this.handleClose}>Check</Button>
        </Wrapper>
      );
    }

    if (encryptedProfile) {
      return <AuthForm handleSubmit={this.handleImportProfile} />;
    }

    return (
      <Container>
        {!this.state.done && (
          <Wrapper>
            {encryptedProfile}
            <QrReader
              delay={delay}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%', marginBottom: 16 }}
            />
          </Wrapper>
        )}
        {this.state.done && (
          <Wrapper>
            <h1>Done</h1>
          </Wrapper>
        )}
      </Container>
    );
  }
}

render(
  <ThemeProvider theme={theme}>
    <ImportProfile />
  </ThemeProvider>,
  window.document.getElementById('app-container')
);
