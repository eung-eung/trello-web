import axios from 'axios'
import { toast } from 'react-toastify'

let authorizeAxios = axios.create()
//thời gian chờ tối đa của 1 request là 10ph
authorizeAxios.defaults.timeout = 1000 * 60 * 10

//withCredentials: cho phép axios tự động gửi cookie trong mỗi request lên server ( phục vụ cho việc xác thực người dùng jwt tokens(refresh & access))
//vào trong httpOnly cookie để xác thực người dùng
authorizeAxios.defaults.withCredentials = true

//interceptor request
authorizeAxios.interceptors.request.use((config) => {
  return config
}, (error) => {

})

//interceptor response
authorizeAxios.interceptors.response.use((response) => {

  return response
}, (error) => {
  let errorMessage = error?.message
  if (error?.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  //status 410: token hết hạn, không cần hiển thị toast lỗi nữa vì đã có logic refresh token tự động trong interceptor request
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})
export default authorizeAxios

