import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_CONFIRM_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE} from '../../utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  // const password = watch('password')

  const submitRegister = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)}>
      <Typography variant='h6' align='center'>Register</Typography>
      <Box>
        <TextField
          label='Email'
          variant='outlined'
          error={!!errors['email']}
          fullWidth
          margin='normal'
          {...register('email', {
            required: EMAIL_RULE_MESSAGE,
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
          label='Password'
          variant='outlined'
          error={!!errors['password']}
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
        <TextField
          label='Confirm Password'
          variant='outlined'
          error={!!errors['confirmPassword']}
          fullWidth
          margin='normal'
          type='password'
          {...register('confirmPassword', {
            validate: (value) => {
              if (value !== watch('password')) {
                return PASSWORD_CONFIRM_RULE_MESSAGE
              }
              return true
            }
          })}
        />
        <FieldErrorAlert error={errors} fieldName='confirmPassword' />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button type='submit' variant='contained' color='primary' fullWidth>Register</Button>

        <Typography variant='body2' align='center' sx={{ mt: 2 }}>
        Already have an account? <Button variant='text' onClick={() => navigate('/login')}>Login</Button>
        </Typography>
      </Box>

    </form>
  )
}

