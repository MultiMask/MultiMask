import { injectGlobal } from 'emotion';

export const theme = {
  colors: {
    primary: '#1888FE',
    main: '#32325D',
    secondary: '#C7CCD7',
    hint: '#DEE3EC',
    error: '#FF3433'
  },
  shadows: [(0: 'box-shadow: 20px 0px 40px 0px rgba(44,66,119,0.05);')]
};

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  #app-container {
    width: 100%;
    height: 100%;
  }
`;
