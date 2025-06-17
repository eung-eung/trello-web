import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import AttachmentIcon from '@mui/icons-material/Attachment'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import GroupIcon from '@mui/icons-material/Group'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
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
          <Typography>This is really suck</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard
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
    </MuiCard>
  )
}

export default Card
