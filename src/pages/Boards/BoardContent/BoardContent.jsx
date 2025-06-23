import Box from '@mui/material/Box'
import ColumnList from './ColumnList/ColumnList'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) => theme.custom.boardContentHeight,
        width: '100%',
        p: '10px 0'
      }}
    >
      <ColumnList columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
