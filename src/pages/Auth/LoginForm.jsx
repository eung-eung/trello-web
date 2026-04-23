import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import ButtonLoading from '~/components/Loading/ButtonLoading'
import { LOADING_KEY } from '~/utils/constants'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logInUserApi } from '~/redux/user/userSlice'

export default function LoginForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [searchParams] = useSearchParams()
  const verifedEmail = searchParams.get('verifedEmail')
  const registeredEmail = searchParams.get('registeredEmail')
  const dispatch = useDispatch()
  const submitLogin = async (data) => {
    const { email, password } = data
    toast.promise(
      dispatch(logInUserApi({ email, password })),
      {
        pending: 'Logging in...'
      }
    ).then((res) => {
      //không có lỗi thì redirect về trang chủ
      if (!res.error) navigate('/')
    })

  }

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <Typography variant='h6' align='center'>Login</Typography>
      {/* Alert */}
      {verifedEmail && (
        <Alert
          variant='standard'
          severity='info'
          iconMapping={{
            info: <InfoIcon sx={{ color: '#3bc4f6' }}/>
          }}
        >
            Your email <strong>{verifedEmail}</strong> has been verified successfully! You can now log in with this email. Have a nice day!
        </Alert>
      )}
      {registeredEmail && (
        <Alert
          variant='standard'
          severity='success'
          iconMapping={{
            success: <CheckCircleIcon sx={{ color: '#22c55e' }}/>
          }}>
            Account created successfully! Please check your email <strong>{registeredEmail}</strong> to verify your account before logging in.
        </Alert>
      )}
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
        <ButtonLoading type='submit' variant='contained' color='primary' fullWidth loadingKey={LOADING_KEY.auth.login}>
          Login
        </ButtonLoading>

        <Typography variant='body2' align='center' sx={{ mt: 2 }}>
            Don't have an account?
          <Button variant='text' onClick={() => navigate('/register')}>Register</Button>
        </Typography>
      </Box>
    </form>
  )
}

