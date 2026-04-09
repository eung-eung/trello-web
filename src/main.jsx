import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { InteractionLockProvider } from './contexts/InteractionLockProvider'
import CustomToastifyContainer from './components/CustomToastifyContainer/CustomToastifyContainer'
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <InteractionLockProvider>
            <App />
          </InteractionLockProvider>
          <CustomToastifyContainer />
        </CssVarsProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
