import { createTheme, type ThemeOptions } from '@mui/material';
import { blue, green, grey, orange, red, teal } from '@mui/material/colors';

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem'
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem'
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem'
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem'
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem'
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem'
    }
  },
  shape: {
    borderRadius: 8
  }
};

const lightThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
      light: blue[500],
      dark: blue[900]
    },
    secondary: {
      main: teal[600],
      light: teal[400],
      dark: teal[800]
    },
    background: {
      default: grey[50],
      paper: '#ffffff'
    },
    text: {
      primary: grey[900],
      secondary: grey[700]
    },
    success: {
      main: green[600]
    },
    error: {
      main: red[600]
    },
    warning: {
      main: orange[600]
    }
  }
};

const darkThemeOptions: ThemeOptions = {
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: blue[300],
      light: blue[200],
      dark: blue[500]
    },
    secondary: {
      main: teal[300],
      light: teal[200],
      dark: teal[500]
    },
    background: {
      default: '#121212',
      paper: grey[900]
    },
    text: {
      primary: grey[100],
      secondary: grey[400]
    },
    success: {
      main: green[400]
    },
    error: {
      main: red[400]
    },
    warning: {
      main: orange[400]
    }
  }
};

const createMedicalTheme = (options: ThemeOptions) => {
  let theme = createTheme(options);

  theme = createTheme(theme, {
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            elevation: 0,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: `1px solid ${theme.palette.divider}`
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            disableElevation: true,
            textTransform: 'none',
            fontWeight: 600
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            elevation: 0,
            border: `1px solid ${theme.palette.divider}`
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            elevation: 0,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: (theme.shape.borderRadius as number) * 1.5
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: theme.shape.borderRadius,
            margin: theme.spacing(0.5, 1),
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
              borderLeft: `3px solid ${theme.palette.primary.main}`,
              paddingLeft: `calc(${theme.spacing(2)} - 3px)`,
              '&:hover': {
                backgroundColor: theme.palette.action.selected
              }
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: '1px'
            }
          }
        }
      }
    }
  } as ThemeOptions);

  return theme;
};

export const lightTheme = createMedicalTheme(lightThemeOptions);
export const darkTheme = createMedicalTheme(darkThemeOptions);
