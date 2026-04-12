import { createSlice } from '@reduxjs/toolkit'

const loadingSlide = createSlice({
  name:'loading',
  initialState:{
    isLoading: false
  },
  reducers:{
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { setLoading } = loadingSlide.actions

export const selectorIsLoading = (state) => state.loading.isLoading

export const loadingReducer = loadingSlide.reducer