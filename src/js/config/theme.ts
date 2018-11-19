export const theme = {
  colors: {
    primary: '#1888FE',
    main: '#32325D',
    secondary: '#C7CCD7',
    hint: '#DEE3EC',
    background: '#FBFBFB',
    error: '#FF3433',
    multi: '#008bff',
    success: '#63ba3c'
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
export type ITheme = typeof theme;
export interface IPropsThemed {
  theme?: ITheme;
}
