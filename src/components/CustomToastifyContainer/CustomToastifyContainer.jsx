import { GlobalStyles, useTheme } from '@mui/material'
import { ToastContainer } from 'react-toastify'

export default function CustomToastifyContainer() {
  const theme = useTheme()

  const GlobalToastifyStyles =() => {
    return (
      <GlobalStyles
        styles={{
          '.Toastify__toast': {
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            borderLeft: '4px solid'
          },

          '.Toastify__toast--success': {
            borderLeftColor: 'green',
            overflow:'hidden'
          },
          '.Toastify__toast--error': {
            borderLeftColor: '#E53935',
            overflow:'hidden'
          },
          '.Toastify__toast--info': {
            borderLeftColor: '#29B6F6'
          },
          '.Toastify__toast--warning': {
            borderLeftColor: '#FFB300'
          },
          '.Toastify__close-button': {
            color:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(0, 0, 0, 0.6)',
            opacity: 0.8,
            transition: 'color 0.2s ease, opacity 0.2s ease',

            '&:hover': {
              color:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(0, 0, 0, 0.9)',
              opacity: 1
            },

            '&:focus-visible': {
              outline: `1px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.5)'
                  : 'rgba(0,0,0,0.5)'
              }`,
              borderRadius: 4
            }
          },
          '.Toastify__progress-bar--wrp': {
            borderBottomLeftRadius: '0 !important'
          }
        }}
      />
    )
  }
  return (
    <>
      <GlobalToastifyStyles/>
      <ToastContainer theme={theme?.palette?.mode} />
    </>
  )
}
