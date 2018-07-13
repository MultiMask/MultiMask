import { injectGlobal } from 'emotion';

export const theme = {
  colors: {
    primary: '#1888FE',
    main: '#32325D',
    secondary: '#C7CCD7',
    hint: '#DEE3EC',
    background: '#FBFBFB',
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
    height: 500px;
    background-color: inherit;
  }

  #app-container {
    width: 100%;
  }

  input[type="button"]:focus{
    outline:none;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
