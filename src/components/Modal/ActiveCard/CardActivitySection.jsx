import { Avatar, Box, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

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
      
    </Box>
  )
}
