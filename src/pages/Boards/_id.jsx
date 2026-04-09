//Board detail
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { moveCardToDifferentColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI } from '~/apis/index'
import { cloneDeep } from 'lodash'
import { fetchBoardDetailsAPI, updateCurrentActiveBoard, selectorCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectorCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect( () => {
    // const boardId = '69d5fa000905b348bbce8505' //tạm hardcode, sau này sẽ lấy từ url param
    //call api
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  //hàm xử lí api khi hoàn thành kéo+thả column
  const moveColumns = async (dndOrderedColumns) => {
    //update cho chuẩn data state Board
    const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)

    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndColumnOrderIds
    dispatch(updateCurrentActiveBoard(newBoard))

    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndColumnOrderIds })

  }

  //hàm xử lí api khi hoàn thành kéo+thả card trong cùng 1 column
  const moveCardsInSameColumn = async (columnId, dndOrderedCards) => {
    const dndCardOrderIds = dndOrderedCards.map(card => card._id)

    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    columnToUpdate.cards = dndOrderedCards
    columnToUpdate.cardOrderIds = dndCardOrderIds

    dispatch(updateCurrentActiveBoard(newBoard))
    await updateColumnDetailsAPI(columnId, { cardOrderIds: dndCardOrderIds })
  }

  //hàm xử lí api khi hoàn thành kéo thả card giữa các column với nhau
  const moveCardsToDifferentColumns = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    //update cho chuẩn data state Board
    const dndColumnOrderIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndColumnOrderIds

    dispatch(updateCurrentActiveBoard(newBoard))

    //xử lí api
    await moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(col => col._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(col => col._id === nextColumnId)?.cardOrderIds
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
        moveColumns={moveColumns}
        moveCardsInSameColumn={moveCardsInSameColumn}
        moveCardsToDifferentColumns={moveCardsToDifferentColumns}
      />
    </Container>
  )
}

export default Board
