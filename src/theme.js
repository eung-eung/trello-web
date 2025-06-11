import { brown } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  custom: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: brown
        // background: {
        //   default: '#fafafa',
        //   paper: '#ffd9ce'
        // },
        // text: {
        //   primary: '#fff'
        // }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#fff'
        },
        background: {
          default: '#1D232A',
          paper: '#242933'
        },
        text: {
          primary: '#E3E9F3',
          secondary: '#9DA8B3'
        },
        divider: '#2F3542'
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
            backgroundColor: '#00b894',
            borderRadius: '4px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 'bold',
          color: theme.palette.primary
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            }
          },
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '2px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '2px !important'
          },
          '& .MuiSvgIcon-root': {
            color: theme.palette.primary.main
          }
        })
      }
    }
  }
})

export default theme
