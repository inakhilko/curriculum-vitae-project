import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ce0000',
      light: 'rgba(210,31,31,0.28)',
      dark: 'rgb(138,52,52)',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
});
