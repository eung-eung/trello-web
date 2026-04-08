//Board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { createNewCardAPI, createNewColumnAPI, deleteColumnAPI, fetchBoardDetailsAPI, moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis/index'
import { cloneDeep } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '69d5fa000905b348bbce8505' //tạm hardcode, sau này sẽ lấy từ url param
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])

  //hàm xử lí api createNewColumn
  const createNewColumn = async(newColumndata) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumndata,
      boardId: board._id
    })

    //xử lí state
    setBoard(board => {
      const cloneBoard = cloneDeep(board)
      cloneBoard.columns.push(createdColumn)
      cloneBoard.columnOrderIds.push(createdColumn._id)
      return cloneBoard
    })
  }

  //hàm xử lí api createNewCard
  const createNewCard = async(newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    //xử lí state
    setBoard(board => {
      const cloneBoard = cloneDeep(board)
      const columnToUpdate = cloneBoard.columns.find(column => column._id === createdCard.columnId)
      if (columnToUpdate) {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
      return cloneBoard
    })
  }

  //hàm xử lí api khi hoàn thành kéo+thả column
  const moveColumns = async (dndOrderedColumns) => {

    //update cho chuẩn data state Board
    const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)

    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = dndOrderedColumns
    cloneBoard.columnOrderIds = dndColumnOrderIds
    setBoard(cloneBoard)

    await updateBoardDetailsAPI(cloneBoard._id, { columnOrderIds: dndColumnOrderIds })

  }

  //hàm xử lí api khi hoàn thành kéo+thả card trong cùng 1 column
  const moveCardsInSameColumn = async (columnId, dndOrderedCards) => {
    const dndCardOrderIds = dndOrderedCards.map(card => card._id)

    const cloneBoard = cloneDeep(board)
    const columnToUpdate = cloneBoard.columns.find(column => column._id === columnId)
    columnToUpdate.cards = dndOrderedCards
    columnToUpdate.cardOrderIds = dndCardOrderIds
    setBoard(cloneBoard)

    await updateColumnDetailsAPI(columnId, { cardOrderIds: dndCardOrderIds })
  }

  //hàm xử lí api khi hoàn thành kéo thả card giữa các column với nhau
  const moveCardsToDifferentColumns = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {

    //update cho chuẩn data state Board
    const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)
    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = dndOrderedColumns
    cloneBoard.columnOrderIds = dndColumnOrderIds
    setBoard(cloneBoard)

    //xử lí api
    await moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(col => col._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(col => col._id === nextColumnId)?.cardOrderIds
    })
  }

  //hàm xử lí api xóa column
  const deleteColumn = async (columnId) => {
    await deleteColumnAPI(columnId)
    //xử lí state
    setBoard(board => {
      const cloneBoard = cloneDeep(board)
      cloneBoard.columns = cloneBoard.columns.filter(column => column._id !== columnId)
      cloneBoard.columnOrderIds = cloneBoard.columnOrderIds.filter(id => id !== columnId)
      return cloneBoard
    })
  }
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', overflow: 'hidden' }}
    >
      <AppBar />
      <BoardBar boardBar={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardsToDifferentColumns={moveCardsToDifferentColumns}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}

export default Board
