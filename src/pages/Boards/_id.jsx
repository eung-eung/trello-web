//Board detail
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis/index'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '68da959e5e36d85262de9971'
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', overflow: 'hidden' }}
    >
      <AppBar />
      <BoardBar boardBar={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
