import ModeSelect from '~/components/ModeSelect'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Profiles from './Menu/Profiles'
import TrelloIcon from '~/assets/trello.svg?react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import AppsIcon from '@mui/icons-material/Apps'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  return (
    <Box
      sx={{
        height: (theme) => theme.custom.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
        paddingX: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: 'primary.main' }}
          />
          <Typography
            variant="span"
            sx={{
              fontWeight: 600,
              fontSize: '1.2rem',
              color: 'primary.main'
            }}
          >
            Trello
          </Typography>

          <Box sx={{ display: { xs: 'none', lg: 'flex', gap: 1 } }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined" startIcon={<LibraryAddIcon />}>
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <TextField
          id="filled-search"
          label="Search..."
          type="search"
          variant="outlined"
          size="small"
          sx={{ minWidth: 120 }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
