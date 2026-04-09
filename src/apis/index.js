import axios from 'axios'
import { API_ENDPOINT } from '~/utils/constants'
// đã chuyển qua redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ENDPOINT}/v1/boards/${boardId}`)
//   //axios sẽ trả kết quả về qua property của nó là data
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateBoardDetailsData) => {
  const response = await axios.put(`${API_ENDPOINT}/v1/boards/${boardId}`, updateBoardDetailsData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ENDPOINT}/v1/boards/supports/moving-card`, updateData)
  return response.data
}
/* API COLUMNs */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ENDPOINT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateColumnDetailsData) => {
  const response = await axios.put(`${API_ENDPOINT}/v1/columns/${columnId}`, updateColumnDetailsData)
  return response.data
}


export const deleteColumnAPI = async (columnId) => {
  const response = await axios.patch(`${API_ENDPOINT}/v1/columns/${columnId}`)
  return response.data
}

/* API CARDs */
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ENDPOINT}/v1/cards`, newCardData)
  return response.data
}