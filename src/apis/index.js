import axios from 'axios'
import authorizeAxios from '~/utils/authorizeAxios'
import { API_ENDPOINT, LOADING_KEY } from '~/utils/constants'
// đã chuyển qua redux
// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ENDPOINT}/v1/boards/${boardId}`)
//   //axios sẽ trả kết quả về qua property của nó là data
//   return response.data
// }

export const updateBoardDetailsAPI = async (boardId, updateBoardDetailsData) => {
  const response = await authorizeAxios.put(`${API_ENDPOINT}/v1/boards/${boardId}`, updateBoardDetailsData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await authorizeAxios.put(`${API_ENDPOINT}/v1/boards/supports/moving-card`, updateData)
  return response.data
}
/* API COLUMNs */
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizeAxios.post(`${API_ENDPOINT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateColumnDetailsData) => {
  const response = await authorizeAxios.put(`${API_ENDPOINT}/v1/columns/${columnId}`, updateColumnDetailsData)
  return response.data
}


export const deleteColumnAPI = async (columnId) => {
  const response = await authorizeAxios.patch(`${API_ENDPOINT}/v1/columns/${columnId}`)
  return response.data
}

/* API CARDs */
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizeAxios.post(`${API_ENDPOINT}/v1/cards`, newCardData, {
    meta: {
      loadingKey: LOADING_KEY.card.create(newCardData.columnId)
    }
  })
  return response.data
}