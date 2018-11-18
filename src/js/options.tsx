import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import QrReader from 'react-qr-reader';

import { theme } from './config/theme';
// import { APPROVAL, SIGNATURE, NOAUTH, DOMAIN } from 'constants/promptTypes';
// import QRCodeView from 'popup/pages/profile/QRCodeView';

import { Prompt } from 'models/Prompt';

const prompt = window.data as Prompt;
console.log(JSON.stringify(prompt));

// const getApp = () => {
//   switch (prompt.routeName()) {
//     default:
//       return <QRCodeView />;
//     // case APPROVAL:
//     //   return <ApproveTX prompt={prompt} />;
//   }
// };

class ImportProfile extends React.Component<any, {}> {
  public state = {
    encryptedProfile: null,
    delay: 500
  };

  public handleScan (encryptedProfile) {
    console.log(encryptedProfile);
  }

  public handleError (err) {
    console.error(err);
  }

  public render () {
    const { encryptedProfile, delay } = this.state;
    return (
      <div>
        {encryptedProfile}
        <QrReader
          delay={delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%', marginBottom: 16 }}
        />
      </div>
    );
  }
}
render(
  <ThemeProvider theme={theme}>
    <ImportProfile />
  </ThemeProvider>,
  window.document.getElementById('app-container')
);
