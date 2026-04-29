import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme.js'
import { InteractionLockProvider } from './contexts/InteractionLockProvider'
import CustomToastifyContainer from './components/CustomToastifyContainer/CustomToastifyContainer'
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from './utils/authorizeAxios'

const persistor = persistStore(store)

//Kĩ thuật inject store: khi sử dụng biến redux store ở các file ngoài phạm vi component(ví dụ axios)
injectStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <InteractionLockProvider>
              <App />
            </InteractionLockProvider>
            <CustomToastifyContainer />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
