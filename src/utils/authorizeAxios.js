import axios from 'axios'
import { toast } from 'react-toastify'
import { refreshTokenApi } from '~/apis'
import { startLoading, stopLoading } from '~/redux/loading/loadingSlice'
import { logOutUserApi } from '~/redux/user/userSlice'

//không dùng được store redux ở file js => inject store rồi import vào main.jsx (nơi chạy đầu tiên)
//
let axiosReduxStore
export const injectStore = (_store) => {
  axiosReduxStore = _store
}
let authorizeAxios = axios.create()
//thời gian chờ tối đa của 1 request là 10ph
authorizeAxios.defaults.timeout = 1000 * 60 * 10

//withCredentials: cho phép axios tự động gửi cookie trong mỗi request lên server ( phục vụ cho việc xác thực người dùng jwt tokens(refresh & access))
//vào trong httpOnly cookie để xác thực người dùng
authorizeAxios.defaults.withCredentials = true

//interceptor request
authorizeAxios.interceptors.request.use((config) => {
  const loadingKey = config.meta?.loadingKey
  axiosReduxStore.dispatch(startLoading(loadingKey))
  return config
}, (error) => {
  const loadingKey = error.config?.meta?.loadingKey
  axiosReduxStore.dispatch(stopLoading(loadingKey))
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  if (error?.response?.status !== 410) {
    toast.error(errorMessage, {
      theme: 'colored'
    })
  }
})

let refreshTokenPromise = null
//interceptor response
authorizeAxios.interceptors.response.use((response) => {
  const loadingKey = response.config?.meta?.loadingKey
  axiosReduxStore.dispatch(stopLoading(loadingKey))
  return response
}, (error) => {
  const loadingKey = error.config?.meta?.loadingKey
  axiosReduxStore.dispatch(stopLoading(loadingKey))
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  //status 410: token hết hạn, không cần hiển thị toast lỗi nữa vì đã có logic refresh token tự động trong interceptor request
  if (error.response?.status !== 410) {
    toast.error(errorMessage, {
      theme: 'colored'
    })
  }
  //Case 1: nhận mã 410 từ BE (accessToken expire), gọi api refreshToken để lấy accessToken mới
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    error.config._retry = true

    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenApi()
        .then(data => {
          return data?.accessToken
        })
        .catch((_error) => {
          //có lỗi thì logout + return để tránh trường hợp gọi logout API 2 lần
          axiosReduxStore.dispatch(logOutUserApi(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          //dù có lỗi hay không cũng sẽ luôn gán lại null cho refreshTokenPromise
          refreshTokenPromise = null
        })
    }

    return refreshTokenPromise.then(accessToken => {
      //Bước 1: đối vs các dự án lưu access token vào local storage hoặc đâu đó
      //thì viết xử lí ở đây
      //hiện tại không cần vì đã đưa accessToken vào cookie ( phía BE ) sau khi refreshTokenAPi thành công

      //Bước 2: return axios instance với các originalRequest để gọi lại những cái ban đầu bị lỗi
      return authorizeAxios(originalRequests)
    })

  }

  //Case 2: nhận mã lỗi 401 => buộc log out luôn
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logOutUserApi(false))
  }

  return Promise.reject(error)
})
export default authorizeAxios

