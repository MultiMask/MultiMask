import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import { theme } from './config/theme';
import { APPROVAL, SIGNATURE, NOAUTH } from 'constants/promptTypes';

import ApproveTX from './prompt/approveTX';
import { SignEosTX } from './prompt/signEosTX';
import { NoAuth } from './prompt/noAuth';
import '../css/prompt.less';

import { Prompt } from 'models/Prompt';
// import { DATA_NO_AUTH } from 'mock/prompt';
// const prompt = Prompt.fromJson(JSON.parse(DATA_NO_AUTH));

const prompt = window.data;

const getApp = () => {
  switch (prompt.routeName()) {
    case APPROVAL:
      return <ApproveTX prompt={prompt} />;
    case SIGNATURE:
      return <SignEosTX prompt={prompt} />;
    case NOAUTH:
      return <NoAuth prompt={prompt} />;
  }
};

render(<ThemeProvider theme={theme}>{getApp()}</ThemeProvider>, window.document.getElementById('app-container'));
