import { createTheme } from '@mui/material';

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#ce0000',
      light: 'rgba(210,31,31,0.28)',
      dark: 'rgb(138,52,52)',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: 0,
          transition: 'border .3s',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow: '0 6px 4px -4px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
          padding: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'background-color .3s',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          transition: 'background-color .3s',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 10,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  ...globalTheme,
  palette: {
    ...globalTheme.palette,
    mode: 'light',
    background: {
      paper: '#eee',
      default: '#F5F5F7FF',
    },
  },
  components: {
    ...globalTheme.components,
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#eee',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          ...globalTheme.components?.MuiTabs?.styleOverrides?.root,
          backgroundColor: '#eee',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        ...globalTheme.components?.MuiOutlinedInput?.styleOverrides,
        input: {
          '-webkit-box-shadow': '0 0 0 1000px #F5F5F7FF inset',
          boxShadow: '0 0 0 1000px #F5F5F7FF inset',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          transition: 'background-color .3s',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.54)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...globalTheme.components?.MuiMenuItem?.styleOverrides?.root,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...globalTheme,
  palette: {
    ...globalTheme.palette,
    mode: 'dark',
    background: {
      paper: '#333',
      default: 'rgb(77,77,77)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    ...globalTheme.components,
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#181818',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          ...globalTheme.components?.MuiTabs?.styleOverrides?.root,
          backgroundColor: '#181818',
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          ...globalTheme.components?.MuiIconButton?.styleOverrides?.root,
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.23)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          transition: 'background-color .3s',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.23)',
          },
        },
        icon: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        ...globalTheme.components?.MuiOutlinedInput?.styleOverrides,
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 1000px rgb(77,77,77) inset',
            boxShadow: '0 0 0 1000px rgb(77,77,77) inset',
            borderRadius: 0,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...globalTheme.components?.MuiMenuItem?.styleOverrides?.root,
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
    },
  },
});
