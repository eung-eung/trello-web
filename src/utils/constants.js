export const API_ENDPOINT = 'http://localhost:3000'
export const PLACEHOLDER_CARD_ID = 'PLACEHOLDER'

export const LOADING_KEY = {
  board: 'board',
  auth: {
    login: 'authLogin',
    register: 'authRegister'
  },
  card: {
    create: (columnId) => `createCard-${columnId}`,
    update: (cardId) => `updateCard-${cardId}`,
    delete: (cardId) => `deleteCard-${cardId}`
  },
  columns: {
    create: (boardId) => `createColumn-${boardId}`,
    update: (columnId) => `updateColumn-${columnId}`,
    delete: (columnId) => `deleteColumn-${columnId}`
  }
}