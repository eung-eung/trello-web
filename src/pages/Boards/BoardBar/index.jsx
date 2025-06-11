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

const CHIP_STYLES = {
  color: 'primary.main',
  backgroundColor: '#fff',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        height: (theme) => theme.custom.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid #1abc9c',
        paddingX: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Chip
          sx={CHIP_STYLES}
          icon={<DashboardIcon />}
          label="Trello Mern Stack"
          clickable
          variant="filled"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
          variant="filled"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<AddToDriveOutlinedIcon />}
          label="Add to drive"
          clickable
          variant="filled"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
          variant="filled"
        />

        <Chip
          sx={CHIP_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
          variant="filled"
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
              fontSize: 16
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
