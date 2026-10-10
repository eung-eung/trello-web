import { InputAdornment, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import PasswordIcon from '@mui/icons-material/Password'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import LockIcon from '@mui/icons-material/Lock'
import useConfirm from '~/hooks/useConfirm'
import LogoutIcon from '@mui/icons-material/Logout'
import ButtonLoading from '~/components/Loading/ButtonLoading'
import { LOADING_KEY } from '~/utils/constants'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { logOutUserApi, updateUserApi } from '~/redux/user/userSlice'

export default function SecurityTab() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const [confirm, ConfirmDialog] = useConfirm(
    'Change Password',
    'You have to login again after successfully changing your password. Continue?',
    <LogoutIcon fontSize='small' sx={{ color: 'orange' }}/>
  )
  const submitChangePassword = async (data) => {
    const isOk = await confirm()
    if (isOk) {
      //xử lí api update password
      toast.promise(dispatch(updateUserApi({
        current_password: data.current_password,
        new_password: data.new_password
      })), {
        pending: 'Updating...'
      }).then(res => {
        if (!res.error) {
          toast.success('Updated password successfully. Please login again')
          dispatch(logOutUserApi(false))
        }
      })
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', mt: 3 }}>
      <ConfirmDialog />
      <Box sx={{
        display: 'flex',
        flexDirection:'column',
        gap: 3,
        justifyContent:'center',
        alignItems:'center'
      }}>
        <Box>
          <Typography variant='h5'>Security Dashboard</Typography>
        </Box>
        <form onSubmit={handleSubmit(submitChangePassword)}>
          <Box sx={{ width: 400, display:'flex', flexDirection:'column', gap: 4 }}>
            <Box>
              <TextField
                fullWidth
                type='password'
                variant='outlined'
                label='Current Password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PasswordIcon fontSize='small'/>
                    </InputAdornment>
                  )
                }}
                {...register('current_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                error={!!errors['current_password']}
              />
              <FieldErrorAlert error={errors} fieldName='current_password'/>
            </Box>
            <Box>
              <TextField
                fullWidth
                type='password'
                variant='outlined'
                label='New Password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon fontSize='small'/>
                    </InputAdornment>
                  )
                }}
                {...register('new_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
                error={!!errors['new_password']}
              />
              <FieldErrorAlert error={errors} fieldName='new_password'/>
            </Box>

            <Box>
              <TextField
                fullWidth
                type='password'
                variant='outlined'
                label='New Password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockIcon fontSize='small'/>
                    </InputAdornment>
                  )
                }}
                {...register('new_password_confirm', {
                  validate: (value) => {
                    if (value === watch('new_password')) return true
                    return 'Password confirm does not match'
                  }
                })}
                error={!!errors['new_password_confirm']}
              />
              <FieldErrorAlert error={errors} fieldName='new_password_confirm'/>
            </Box>
            <Box>
              <ButtonLoading loadingKey={LOADING_KEY.auth.updatePassword} type='submit' fullWidth variant='contained' color='submit'>Change</ButtonLoading>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
