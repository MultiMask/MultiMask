import { injectGlobal } from 'emotion';

export const theme = {
  colors: {
    primary: '#1888FE',
    main: '#32325D',
    secondary: '#C7CCD7',
    hint: '#DEE3EC',
    error: '#FF3433'
  },
  shadows: {
    0: '0px 0px 40px 0px rgba(44,66,119,0.05)',
    1: '20px 0px 40px 0px rgba(44,66,119,0.05);'
  },
  typography: {
    small: '14px',
    medium: '15px',
    large: '17px'
  }
};

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  #app-container {
    width: 100%;
  }

  input[type="button"]{
    outline:none;
  }
`;
