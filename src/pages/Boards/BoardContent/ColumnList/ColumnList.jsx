import Box from '@mui/material/Box'

import Column from './Column/Column'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Flip, toast } from 'react-toastify'
import { createNewColumnAPI } from '~/apis'
import { useDispatch, useSelector } from 'react-redux'
import { selectorCurrentActiveBoard, updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { cloneDeep } from 'lodash'

function ColumnList({ columns, activeColumnId }) {
  const dispatch = useDispatch()
  const board = useSelector(selectorCurrentActiveBoard)
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle('')
  }
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const handleCreateNewColumn = async () => {
    if (!newColumnTitle) {
      toast.warn('Please input column title', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Flip
      })
      return
    }

    const newColumnData = {
      title: newColumnTitle
    }
    //call api
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    //nếu newBoard vẫn còn reference tới state cũ trong store
    //thì sẽ bị frozen array (vì state trong redux store là immutable) => sẽ không push được column mới vào nữa
    //=> phải cloneDeep để tạo ra một newBoard hoàn toàn mới, không còn reference tới state cũ trong store nữa
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    dispatch(updateCurrentActiveBoard(newBoard))

    //đóng form create column
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext
      items={columns.map((c) => c._id)} //cần 1 mảng dạng ['id-1', 'id-2'] chứ không phải [ { id: 'id-1' }, { id: 'id-2' }], nếu ko đúng dạng thì vẫn kéo thả dc nhưng ko có animation
      strategy={horizontalListSortingStrategy}
    >
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
          <Column
            key={column._id}
            column={column}
            isActiveColumn={activeColumnId === column._id}
          />
        ))}

        {/* Add new column Box */}
        { !openNewColumnForm
          ?
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
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
            >
              <AddIcon fontSize='medium' sx={{ mr:1, color:'#ffffffc7' }}/>
              Add new column
            </Button>
          </Box>
          :
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              marginLeft: 2,
              borderRadius: '6px',
              height: 'fit-content',
              boxShadow: '0 0 0 3px rgbrgba(0, 0, 0, 0.3)',
              bgcolor: '#ffffff1c'
            }}
          >
            {/*---- Header ----*/}
            <Box
              sx={{
                height: (theme) => theme.custom.columnHeaderHeight,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2
              }}
            >
              <TextField
                placeholder="Enter column title..."
                type="text"
                variant="outlined"
                value={newColumnTitle}
                autoFocus
                onChange={(e) => setNewColumnTitle(e.target.value)}
                size="small"
                sx={{
                  width: '100%',
                  '.MuiOutlinedInput-input': {
                    color: 'white !important',
                    outlineColor:'white !important',
                    '&::placeholder': {
                      color: 'white !important',
                      opacity:0.9
                    }
                  },
                  '& fieldset':{
                    borderColor: 'white !important'
                  }
                }}
              />
            </Box>


            {/*---- Footer ----*/}
            <Box
              sx={{
                height: (theme) => theme.custom.columnFooterHeight,
                display: 'flex',
                alignItems: 'center',
                gap:0.5,
                p: 2
              }}
            >
              <Button
                variant='contained'
                color='success'
                size='small'
                sx={{
                  color: 'white',
                  boxShadow: 'none',
                  border: '0 5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
                onClick={handleCreateNewColumn}
              >
                Add column
              </Button>
              <Button
                onClick={toggleOpenNewColumnForm}
                variant='text'>
                <CloseIcon sx={{ color: 'white' }}/>
              </Button>
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ColumnList
