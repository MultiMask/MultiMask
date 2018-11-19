import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import QrReader from 'react-qr-reader';
import styled from 'react-emotion';
import '../css/options.less';

import { theme } from './config/theme';

import InternalMessage from 'services/InternalMessage';
import { PROFILE_IMPORT_QRCODE } from 'constants/profile';

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

      InternalMessage.payload(PROFILE_IMPORT_QRCODE, { payload: { encryptedProfile: JSON.parse(encryptedProfile) } })
        .send()
        .then(response => {
          console.log(response);
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
