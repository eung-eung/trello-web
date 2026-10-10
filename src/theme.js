import { brown } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
// Create a theme instance.
const theme = createTheme({
  custom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-selected': {
            color: theme.palette.mode === 'dark' && '#fff'
          }
        })
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: theme.palette.mode === 'dark' && '#fff'
        })
      }
    },
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
            theme.palette.mode === 'dark' ? 'white !important' : theme.palette.primary.main
        })
      }
    },
    MuiButton: {
      styleOverrides: {
        root: () => {
          return ({
            textTransform: 'none',
            fontWeight: 'bold',
            color: '#ffffff'
          })},
        outlined: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
        }),
        text: ({ theme }) => ({
          color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
        }),
        //variant + color map thành tên
        containedSubmit: ({ theme }) => ({
          backgroundColor:
          theme.palette.mode === 'dark'
            ? '#5865F2'
            : theme.palette.primary.main,

          '&:hover': {
            backgroundColor:
            theme.palette.mode === 'dark'
              ? '#4752C4'
              : '#5d4037'
          }
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
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.mode === 'dark' ? '#424242' : '#fff',
          '&.Mui-focused input': {
            borderWidth: '2px !important',
            borderColor:
              theme.palette.mode === 'dark'
                ? 'white !important'
                : theme.palette.primary.main
          }
        })
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
