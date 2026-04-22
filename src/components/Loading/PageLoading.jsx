import { Box, CircularProgress, Typography } from '@mui/material'

export default function PageLoading({ caption }) {
  return (
    <Box sx={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
      width: '100vw',
      flexDirection:'column',
      gap: 2
    }}>
      <CircularProgress color='white'/>
      <Typography variant="body1">{caption}</Typography>
    </Box>
  )
}
