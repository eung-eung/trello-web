import { Avatar, Box, Popover, Tooltip } from '@mui/material'
import { useState } from 'react'

export default function BoardUserGroup({ boardUsers = [], limit = 8 }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const isOpenPopover = Boolean(anchorEl)
  const popoverId = isOpenPopover ? 'board-all-users-popover' : undefined
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Box sx={{ display:'flex', gap: '4px', alignItems: 'center' }}>
        {[...Array(16)].map((_, index) => {
          if (index < limit) {
            return (
              <Tooltip title="eungeung" key={index}>
                <Avatar
                  alt="eungeung"
                  src="https://avatars.githubusercontent.com/u/93731161?s=48&v=4"
                />
              </Tooltip>
            )
          }
        })}

        {/* nếu số lượng users nhiều hơn limit thì hiện +number */}
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
      </Box>
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
    </div>
  )
}
