import Box from '@mui/material/Box'
import ColumnList from './ColumnList/ColumnList'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) => theme.custom.boardContentHeight,
        width: '100%',
        p: '10px 0'
      }}
    >
      <ColumnList />
    </Box>
  )
}

export default BoardContent
