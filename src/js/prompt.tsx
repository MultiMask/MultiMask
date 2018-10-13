import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';

import { theme } from './config/theme';
import { APPROVAL, SIGNATURE } from 'constants/promptTypes';

import ApproveTX from './prompt/approveTX';
import { SignEosTX } from './prompt/signEosTX';
import '../css/prompt.less';

import { Prompt } from 'models/Prompt';
// import { DATA_EOS_CONTRACT } from 'mock/prompt';
// const prompt = Prompt.fromJson(JSON.parse(DATA_EOS_CONTRACT));

const prompt = window.data;

const getApp = () => {
  switch (prompt.routeName()) {
    case APPROVAL:
      return <ApproveTX prompt={prompt} />;
    case SIGNATURE:
      return <SignEosTX prompt={prompt} />;
  }
};

render(<ThemeProvider theme={theme}>{getApp()}</ThemeProvider>, window.document.getElementById('app-container'));
