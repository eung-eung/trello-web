import { createSlice } from '@reduxjs/toolkit'

const loadingSlide = createSlice({
  name:'loading',
  initialState:{
    global: 0,
    map: {}
  },
  reducers:{
    startLoading: (state, action) => {
      const loadingKey = action.payload || 'global'

      if (!state.map[loadingKey]) {
        state.map[loadingKey] = 0
      }

      state.map[loadingKey]++
      state.global++
    },
    stopLoading: (state, action) => {
      const loadingKey = action.payload || 'global'

      if (state.map[loadingKey]) {
        state.map[loadingKey]--
        if (state.map[loadingKey] <= 0) {
          delete state.map[loadingKey]
        }
      }
      state.global = Math.max(0, state.global - 1)
    },
    resetLoading: (state, action) => {
      const loadingKey = action.payload || 'global'
      console.log({ loadingKey })
      console.log(state)
      if (state.map[loadingKey]) {
        delete state.map[loadingKey]
      } else {
        state.global = 0
        state.map = {}
      }
    }
  }
})

export const { startLoading, stopLoading, resetLoading } = loadingSlide.actions

export const selectorLoading = (state) => state.loading

export const loadingReducer = loadingSlide.reducer