import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const navigate = useNavigate()
  return (
    <Box sx={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter:'blur(10px)',
      padding: '2rem',
      borderRadius: '8px',
      border: '1px solid rgb(0, 0, 0)'
    }}>
      <Typography variant='h6' align='center'>Login</Typography>

      <TextField label='Email' variant='outlined' fullWidth margin='normal' />
      <TextField label='Password' variant='outlined' fullWidth margin='normal' type='password' />
      <Button variant='contained' color='primary' fullWidth>Login</Button>

      <Typography variant='body2' align='center' sx={{ mt: 2 }}>
        Don't have an account?
        <Button variant='text' onClick={() => navigate('/register')}>Register</Button>
      </Typography>
    </Box>
  )
}

