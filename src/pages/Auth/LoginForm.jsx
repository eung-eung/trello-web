import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
export default function LoginForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
console.log(errors)
  const submitLogin = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Typography variant='h6' align='center'>Login</Typography>
      <Box>
        <TextField
          autoFocus
          error={!!errors['email']}
          label='Email'
          variant='outlined'
          margin='normal'
          fullWidth
          {...register('email', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE
            }
          })}
        />
        <FieldErrorAlert error={errors} fieldName='email' />
      </Box>
      <Box>
        <TextField
          error={!!errors['password']}
          label='Password'
          variant='outlined'
          fullWidth
          margin='normal'
          type='password'
          {...register('password', {
            required:FIELD_REQUIRED_MESSAGE,
            pattern:{
              value:PASSWORD_RULE,
              message:PASSWORD_RULE_MESSAGE
            }
          })}
        />
        <FieldErrorAlert error={errors} fieldName='password' />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button type='submit' variant='contained' color='primary' fullWidth>Login</Button>

        <Typography variant='body2' align='center' sx={{ mt: 2 }}>
            Don't have an account?
          <Button variant='text' onClick={() => navigate('/register')}>Register</Button>
        </Typography>
      </Box>
    </form>
  )
}

