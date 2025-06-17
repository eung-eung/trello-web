import { brown } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// Create a theme instance.
const theme = createTheme({
  custom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: brown
      }
    },
    dark: {
      palette: {
        background: {
          default: '#1D232A',
          paper: '#1D232A'
        },
        primary: {
          main: '#1D232A'
        }
      }
    },

    cssVariables: {
      colorSchemeSelector: 'class'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#e0e0e0',
            borderRadius: '4px'
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color:
            theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
        })
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 'bold',
          color:
            theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color:
            theme.palette.mode === 'dark'
              ? 'white'
              : theme.palette.primary.main,
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color:
              theme.palette.mode === 'dark'
                ? 'white'
                : theme.palette.primary.main
          }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color:
            theme.palette.mode === 'dark'
              ? 'white'
              : theme.palette.primary.main,
          fontSize: '0.875rem',

          '.MuiOutlinedInput-notchedOutline': {
            borderColor:
              theme.palette.mode === 'dark'
                ? 'white'
                : theme.palette.primary.main
          },

          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor:
                theme.palette.mode === 'dark'
                  ? 'white'
                  : theme.palette.primary.main
            }
          },

          '& fieldset': {
            borderWidth: '0.5px !important'
          },

          '&:hover fieldset': {
            borderWidth: '2px !important'
          },

          '&.Mui-focused fieldset': {
            borderWidth: '2px !important',
            borderColor:
              theme.palette.mode === 'dark'
                ? 'white !important'
                : theme.palette.primary.main
          },
          '& .MuiSvgIcon-root': {
            color:
              theme.palette.mode === 'dark'
                ? 'white'
                : theme.palette.primary.main
          }
        })
      }
    }
  }
})

export default theme
