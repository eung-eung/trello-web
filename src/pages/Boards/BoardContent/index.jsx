import { useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import Cloud from '@mui/icons-material/Cloud'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddCard from '@mui/icons-material/AddCard'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import GroupIcon from '@mui/icons-material/Group'
import DragHandle from '@mui/icons-material/DragHandle'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) => theme.custom.boardContentHeight,
        width: '100%',
        p: '10px 0'
      }}
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
        {/*---- Box column 1 ----*/}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            marginLeft: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) =>
              `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/*---- Header ----*/}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
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
              Column Title
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
          {/* Card lists */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
             ${theme.custom.boardContentHeight} -
             ${COLUMN_HEADER_HEIGHT} -
             ${COLUMN_FOOTER_HEIGHT} -
             ${theme.spacing(5)}
            )`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>This is really suck</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<ChatBubbleOutlinedIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  5
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>{' '}
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
          </Box>

          {/*---- Footer ----*/}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2
            }}
          >
            <Button startIcon={<AddCard />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandle sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        {/*---- Box column 2 ----*/}
        <Box
          sx={{
            minWidth: '300px',
            maxWidth: '300px',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            marginLeft: 2,
            borderRadius: '6px',
            height: 'fit-content',
            maxHeight: (theme) =>
              `calc(${theme.custom.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/*---- Header ----*/}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
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
              Column Title
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
          {/* Card lists */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(
             ${theme.custom.boardContentHeight} -
             ${COLUMN_HEADER_HEIGHT} -
             ${COLUMN_FOOTER_HEIGHT} -
             ${theme.spacing(5)}
            )`,
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>This is really suck</Typography>
              </CardContent>
              <CardActions sx={{ padding: '0 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon />}>
                  20
                </Button>
                <Button size="small" startIcon={<ChatBubbleOutlinedIcon />}>
                  15
                </Button>
                <Button size="small" startIcon={<AttachmentIcon />}>
                  5
                </Button>
              </CardActions>
            </Card>
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                overflow: 'unset'
              }}
            >
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Suck</Typography>
              </CardContent>
            </Card>
          </Box>

          {/*---- Footer ----*/}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2
            }}
          >
            <Button startIcon={<AddCard />}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandle sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
