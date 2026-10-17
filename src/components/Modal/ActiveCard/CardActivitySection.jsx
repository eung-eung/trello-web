import { Avatar, Box, TextField, Tooltip, Typography } from '@mui/material'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
export default function CardActivitySection() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
        <Avatar width={36} height={36} sx={{ borderRadius: 50 }} src={currentUser?.avatar}/>
        <TextField fullWidth variant='outlined' placeholder='Write a comment'/>
      </Box>

      {/* hiển thị danh sách comments của Card */}
      {[...Array(0)].length === 0 &&
        <Typography sx={{ pl:'45px', fontSize: 14, fontWeight: 500, color: '#b1b1b1', mt: 2 }}>No activity found</Typography>
      }
      {/* Comment List */}
      <Box>
        {[...Array(6)].map((comment, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Avatar width={36} height={36} src='https://cfcdn.apowersoft.info/astro/picwish/_astro/safety-img.BwCePVDJ.png'/>
            <Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant='caption' fontWeight={600}>User Vip</Typography>
                <FiberManualRecordIcon sx={{ fontSize: 5 }}/>
                <Tooltip
                  placement='bottom'
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: { offset: [0, -15] }
                        }
                      ]
                    },
                    tooltip: {
                      sx: {
                        bgcolor: 'rgba(179, 176, 176, 0.9)',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 400,
                        borderRadius: '8px',
                        px: 1.2,
                        py: 0.7,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                      }
                    },
                    arrow: {
                      sx: {
                        color: 'rgba(40, 40, 40, 0.88)'
                      }
                    }
                  }}
                  title={moment(currentUser?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                >
                  <Typography variant='caption'>
                    {moment(currentUser?.createdAt).fromNow()}
                  </Typography>
                </Tooltip>
              </Box>
              <Typography>hahaha, Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias qui facere, animi optio nostrum unde repellat nisi minus excepturi modi tenetur totam aspernatur numquam, incidunt tempora quaerat. Ipsa, itaque provident?</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
