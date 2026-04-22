import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxios from '~/utils/authorizeAxios'
import { API_ENDPOINT, LOADING_KEY } from '~/utils/constants'

const initUser = {
  currentUser: null
}

export const logInUserApi = createAsyncThunk(
  'user/logInUserApi',
  async (data) => {
    const response = await authorizeAxios.post(`${API_ENDPOINT}/v1/users/login`, data, {
      meta: {
        loadingKey: LOADING_KEY.auth.login
      }
    })
    return response.data
  })

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(logInUserApi.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer