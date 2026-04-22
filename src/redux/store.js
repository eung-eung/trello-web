import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice.js'
import { loadingReducer } from './loading/loadingSlice.js'
import { userReducer } from './user/userSlice.js'

import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root', //key do mình chỉ định
  storage: storage, // storage ở trên, lưu vào localstorage
  whitelist: ['currentUser'] // định nghĩa các slice dữ liệu được phép duy trì qua mỗi lần f5 trình duyệt
//blacklist: ['user'] // không được phép duy trì qua mỗi f5
}

//combine các reducers trong dự án ở đây
// const reducers = combineReducers({
//   activeBoard: activeBoardReducer,
//   loading: loadingReducer,
//   user: userReducer
// })

//tạo persisted reducer (lưu vào storage)
const persistedReducer = persistReducer(rootPersistConfig, userReducer)

export const store = configureStore({
  reducer: {
    activeBoard: activeBoardReducer,
    loading: loadingReducer,
    user: persistedReducer
  }
})

