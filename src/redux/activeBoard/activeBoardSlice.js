import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxios from '~/utils/authorizeAxios'

import { API_ENDPOINT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'

//các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào redux
//=> dùng Middleware createAsyncThunk (giống như redux-thunk) để tạo ra các action bất đồng bộ
//sau đó dùng extraReducers để cập nhật dữ liệu vào redux
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizeAxios.get(`${API_ENDPOINT}/v1/boards/${boardId}`)
    return response.data
  }
)
const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState: {
    currentActiveBoard: null
  },
  //Reducers: xử lí dữ liệu đồng bộ
  reducers:{
    updateCurrentActiveBoard: (state, action) => {
      const fullBoard = action.payload
      state.currentActiveBoard = fullBoard
    }
  },
  //ExtraReducers: xử lí dữ liệu bất đồng bộ (thường là kết quả trả về từ API sau khi gọi bằng createAsyncThunk)
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.playload là dữ liệu trả về từ API sau khi gọi bằng createAsyncThunk (response.data)
      const board = action.payload
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      //update lại dữ liệu của state currentActiveBoard trong redux store
      state.currentActiveBoard = board
    })
  }
})

//Actions: là nơi dành cho các component bên dưới gọi bằng dispatch() tới nó để cập nhật
//lại dữ liệu thông qua reducer (chạy đồng bộ)
//Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những actions này đơn giản
//là được redux tạo tự động theo tên reducers
// nên khi mình gọi updateCurrentActiveBoard thì redux sẽ tự động tạo ra một action có type là activeBoard/updateCurrentActiveBoard
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

//Selector: là nơi dành cho các component bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ kho redux store
export const selectorCurrentActiveBoard = (state) => state.activeBoard.currentActiveBoard

//export reducer để đưa vào store xử lí (store.js)
export const activeBoardReducer = activeBoardSlice.reducer
