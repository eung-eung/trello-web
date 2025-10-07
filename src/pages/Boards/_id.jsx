//Board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { createNewCardAPI, createNewColumnAPI, fetchBoardDetailsAPI, updateBoardDetailsAPI } from '~/apis/index'
import { cloneDeep } from 'lodash'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '68da959e5e36d85262de9971'
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
    console.log({ dndOrderedColumns })
    //update cho chuẩn data state Board
    const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)

    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = dndOrderedColumns
    cloneBoard.columnOrderIds = dndColumnOrderIds
    setBoard(cloneBoard)

    await updateBoardDetailsAPI(cloneBoard._id, { columnOrderIds: dndColumnOrderIds })

  }
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', overflow: 'hidden' }}
    >
      <AppBar />
      <BoardBar boardBar={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns}/>
    </Container>
  )
}

export default Board
