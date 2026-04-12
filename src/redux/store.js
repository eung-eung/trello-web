import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice.js'
import { loadingReducer } from './loading/loadingSlice.js'

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    loading: loadingReducer
  }
})

