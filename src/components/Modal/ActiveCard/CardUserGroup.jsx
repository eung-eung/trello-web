import { Avatar, Box, Popover, Tooltip } from '@mui/material'
import { useState } from 'react'

export default function CardUserGroup(boardUsers = [], limit = 8) {
  const [anchorEl, setAnchorEl] = useState(null)

  const isOpenPopover = Boolean(anchorEl)
  const popoverId = isOpenPopover ? 'card-all-users-popover' : undefined

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '500px', gap: 0.5, mb: 3 }}>
      {[...Array(8)].map((_, index) => (
        <Tooltip title="eungeung" key={index}>
          <Avatar
            sx={{ width: 34, height: 34, cursor: 'pointer' }}
            alt="eungeung"
            src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
          />
        </Tooltip>
      ))}
      {/* show more */}
      {[...Array(16)].length > limit && (
        <Tooltip title='Show more'>
          <Box
            aria-describedby={popoverId}
            variant='contained'
            onClick={handleClick}
            sx={{
              display: 'flex',
              width: 36,
              height:36,
              cursor: 'pointer',
              alignItems:'center',
              justifyContent:'center',
              fontSize: '14px',
              fontWeight: 600,
              borderRadius: '50%',
              color: 'white',
              backgroundColor: '#a4b0be'
            }}
          >
                +{[...Array(16)].length - limit}
          </Box>
        </Tooltip>
      )}

      <Popover
        id={popoverId}
        open={isOpenPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p:2, display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 235 }}>
          {[...Array(16)].map((_, index) => (
            <Tooltip title="eungeung" key={index}>
              <Avatar
                sx={{ width: 34, height: 34, cursor: 'pointer' }}
                alt="eungeung"
                src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>
    </Box>
  )
}
