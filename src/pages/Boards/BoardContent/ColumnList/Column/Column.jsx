import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

import AddCard from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandle from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CloseIcon from '@mui/icons-material/Close'

import { useState } from 'react'
import CardList from './CardList/CardList'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDroppable } from '@dnd-kit/core'
import { PLACEHOLDER_CARD_ID } from '~/utils/constants'
import { Bounce, toast } from 'react-toastify'

function Column({ column, isActiveColumn, createNewCard }) {
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [openNewCardForm, setOpenNewCardForm] = useState(false)

  const toggleOpenNewCardForm = () => {
    setNewCardTitle('')
    setOpenNewCardForm(!openNewCardForm)
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: column._id, data: { ...column } })

  const { setNodeRef: setPlaceholderRef } = useDroppable({
    id: `${PLACEHOLDER_CARD_ID}-${column._id}`,
    data: { columnId: column._id }
  })

  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    // height 100% để ngăn chặn việc kéo thả bị lỗi khi kéo column nhỏ sang column cao hơn
    height: '100%',
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const handleCreateNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please input card title', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce
      })
      return
    }

    //call api
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }
    await createNewCard(newCardData)
    //reset form
    toggleOpenNewCardForm()
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <div ref={!!column.cards?.length ? null : setPlaceholderRef}>
        <Box
          {...listeners}
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            marginLeft: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) =>
              `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`,
            border: '2px solid transparent',
            boxShadow: isActiveColumn
              ? '0 0 0 3px rgba(0, 121, 191, 0.3)'
              : '0 1px 3px rgba(0,0,0,0.1)',
            transition: '0.2s ease',
            borderColor: (theme) =>
              isActiveColumn
                ? theme.palette.mode === 'dark'
                  ? '#3B82F6'
                  : 'rgba(45, 83, 255, 1)'
                : 'none',
            display: 'flex',
            flexDirection: 'column'
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
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'white'
                    : theme.palette.primary.main
              }}
            >
              {column?.title}
            </Typography>
            {/* options  */}
            <Box>
              <Tooltip title="More options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={
                    open ? 'basic-menu-column-dropdown' : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-column-dropdown'
                  }
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCard fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Card list */}
          <CardList cards={orderedCards} columnId={column._id} />

          {/*---- Footer ----*/}
          { !openNewCardForm
            ? <Box
              sx={{
                height: (theme) => theme.custom.columnFooterHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p:2
              }}>
              <Button
                data-no-dnd="true"
                onClick={toggleOpenNewCardForm}
                startIcon={<AddCard />}
              >
                  Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandle sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            : <Box
              data-no-dnd="true"
              sx={{
                display:'flex',
                flexDirection:'column',
                gap: 1,
                padding:'0 5px',
                margin: '8px 5px'
              }}>
              <Box>
                <TextField
                  placeholder="Enter card title..."
                  type="text"
                  variant="outlined"
                  value={newCardTitle}
                  multiline
                  minRows={2}
                  autoFocus
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  size="small"
                  sx={{
                    width: '100%',
                    background:(theme) => theme.palette.mode === 'light' ? 'white' : '#1d232ab0',
                    '.MuiOutlinedInput-input': {
                      '&::placeholder': {
                        opacity:0.9
                      }
                    }
                  }}
                />
              </Box>
              <Box sx={{ display:'flex', paddingBottom:1 }}>
                <Button
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{
                    color: 'white',
                    boxShadow: 'none',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                  onClick={handleCreateNewCard}
                >
                  Add card
                </Button>
                <Button
                  onClick={toggleOpenNewCardForm}
                  variant='text'>
                  <CloseIcon />
                </Button>
              </Box>
            </Box>
          }
        </Box>
      </div>
    </div>
  )
}

export default Column
