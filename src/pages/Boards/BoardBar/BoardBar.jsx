import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'

import VpnLockIcon from '@mui/icons-material/VpnLock'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddToDriveOutlinedIcon from '@mui/icons-material/AddToDriveOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

import { capitalizeFirstLetter } from '~/utils/formaters'

const CHIP_STYLES = {
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: (theme) =>
      theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar({ boardBar }) {
  return (
    <Box
      sx={{
        height: (theme) => theme.custom.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid',
        borderColor: 'primary.light',
        paddingX: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Chip
          sx={CHIP_STYLES}
          icon={<DashboardIcon />}
          label={boardBar?.title}
          clickable
          variant="outlined"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(boardBar?.type)}
          clickable
          variant="outlined"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<AddToDriveOutlinedIcon />}
          label="Add to drive"
          clickable
          variant="outlined"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
          variant="outlined"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          variant="outlined"
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="eungeung">
            <Avatar
              alt="eungeung"
              src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
            />
          </Tooltip>
          <Tooltip title="eungeung">
            <Avatar
              alt="eungeung"
              src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
            />
          </Tooltip>
          <Tooltip title="eungeung">
            <Avatar
              alt="eungeung"
              src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
            />
          </Tooltip>
          <Tooltip title="eungeung">
            <Avatar
              alt="eungeung"
              src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
            />
          </Tooltip>
          <Tooltip title="eungeung">
            <Avatar
              alt="eungeung"
              src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
