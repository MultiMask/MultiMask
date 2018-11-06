import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import { theme } from './config/theme';
import { APPROVAL, SIGNATURE, NOAUTH, DOMAIN } from 'constants/promptTypes';

import ApproveTX from './prompt/approveTX';
import { SignEosTX } from './prompt/signEosTX';
import { NoAuth } from './prompt/noAuth';
import { DomainAccess } from './prompt/domainAccess';
import '../css/prompt.less';

import { Prompt } from 'models/Prompt';
// import { DATA_DOMAIN } from 'mock/prompt';
// const prompt = Prompt.fromJson(JSON.parse(DATA_DOMAIN));

const prompt = window.data as Prompt;
// console.log(JSON.stringify(prompt));

const getApp = () => {
  switch (prompt.routeName()) {
    case APPROVAL:
      return <ApproveTX prompt={prompt} />;
    case SIGNATURE:
      return <SignEosTX prompt={prompt} />;
    case NOAUTH:
      return <NoAuth prompt={prompt} />;
    case DOMAIN:
      return <DomainAccess prompt={prompt} />;
  }
};

render(<ThemeProvider theme={theme}>{getApp()}</ThemeProvider>, window.document.getElementById('app-container'));
