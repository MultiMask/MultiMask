import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import QrReader from 'react-qr-reader';
import styled from 'react-emotion';
import '../css/options.less';

import { theme } from './config/theme';
// import { APPROVAL, SIGNATURE, NOAUTH, DOMAIN } from 'constants/promptTypes';
// import QRCodeView from 'popup/pages/profile/QRCodeView';

import { Prompt } from 'models/Prompt';

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
        encryptedProfile,
        done: true
      });
    }
  };

  public handleError = err => {
    console.error(err);
  };

  public render () {
    const { encryptedProfile, delay } = this.state;
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
            <div>{this.state.encryptedProfile}</div>
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
