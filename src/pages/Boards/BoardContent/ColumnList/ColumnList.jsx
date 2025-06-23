import Box from '@mui/material/Box'

import Column from './Column/Column'
import Button from '@mui/material/Button'
import { NoteAdd } from '@mui/icons-material'

function ColumnList({ columns }) {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        width: '100%',
        height: '100%',
        '&::-webkit-scrollbar-track': {
          m: 2
        }
      }}
    >
      {columns?.map((column) => (
        <Column key={column._id} column={column} />
      ))}

      {/* Add new column Box */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}
      >
        <Button
          sx={{
            width: '100%',
            color: 'white',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
          startIcon={<NoteAdd sx={{ color: 'white' }} />}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ColumnList
