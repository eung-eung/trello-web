import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxios from '~/utils/authorizeAxios'
import { API_ENDPOINT } from '~/utils/constants'


export const fetchBoardListAPI = createAsyncThunk(
  'boards/fetchBoardListAPI',
  async ({ page, limit }) => {
    const response = await authorizeAxios.get(`${API_ENDPOINT}/v1/boards?page=${page}&limit=${limit}`, {
      meta: {
        loadingKey: 'getBoardList'
      }
    })
    return response.data
  }
)

export const createBoardAPI = createAsyncThunk(
  'boards/createBoardAPI',
  async (boardData) => {
    const response = await authorizeAxios.post(`${API_ENDPOINT}/v1/boards`, boardData, {
      meta: {
        loadingKey: 'createBoard'
      }
    })
    return response.data
  }
)

const boardListSlice = createSlice({
  name: 'boards',
  initialState: {
    boardList: [],
    totalBoards: 0
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardListAPI.fulfilled, (state, action) => {
      state.boardList = action.payload.boardList
      state.totalBoards = action.payload.totalBoards
    })
  }
})

export const selectBoardList = (state) => state.boards

export const boardListReducer = boardListSlice.reducer