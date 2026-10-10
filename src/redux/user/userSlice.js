import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
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

export const logOutUserApi = createAsyncThunk( 'user/logOutUserApi', async (showSuccessMessage = true) => {
  const response = await authorizeAxios.delete(`${API_ENDPOINT}/v1/users/logout`)
  if (showSuccessMessage) {
    toast.success('Logged out successfully!')
  }
  return response.data
})

export const updateUserApi = createAsyncThunk('user/updateUserApi', async (data) => {
  const isUpatePassword = data.current_password
  const response = await authorizeAxios.put(`${API_ENDPOINT}/v1/users/update`, data, {
    meta: {
      loadingKey: isUpatePassword ? LOADING_KEY.auth.updatePassword : LOADING_KEY.auth.updateProfile
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
    builder.addCase(logOutUserApi.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserApi.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
    })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser

export const userReducer = userSlice.reducer