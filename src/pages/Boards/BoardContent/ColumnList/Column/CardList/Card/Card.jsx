import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import AttachmentIcon from '@mui/icons-material/Attachment'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import GroupIcon from '@mui/icons-material/Group'

function Card({ card }) {
  const shoudldShowCardActions = () => {
    return !!(
      card?.memberIds?.length ||
      card?.comments?.length ||
      card?.attachments?.length
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
      {card?.cover && (
        <CardMedia component="img" height="140" image={card?.cover} />
      )}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5
          }
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shoudldShowCardActions() && (
        <CardActions sx={{ padding: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<ChatBubbleOutlinedIcon />}>
              {card.comments.length}
            </Button>
          )}

          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
