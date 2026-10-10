import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserApi } from '~/redux/user/userSlice'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MailIcon from '@mui/icons-material/Mail'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import ButtonLoading from '~/components/Loading/ButtonLoading'
import { LOADING_KEY } from '~/utils/constants'
import { toast } from 'react-toastify'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: currentUser.displayName
    }
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data
    //không có thay đổi về display name thì không làm gì
    if (displayName === currentUser?.displayName) return

    //call api
    toast.promise(dispatch(updateUserApi({ displayName })), {
      pending: 'Updating...'
    }).then(res => {
      if (!res.error) {
        toast.success('User updated successfully')
      }
    })
  }

  const uploadAvatar = (e) => {
    console.log(e.target.files[0])
    const error = singleFileValidator(e.target.files[0])
    if (error) {
      toast.error(error)
      return
    }

    //sử dụng form data để xử lí dữ liệu liên quan tới file khi call api
    let reqData = new FormData()
    reqData.append('avatar', e.target.files[0])

    //dispatch(createAsyncThunk()) luôn resolve promise, dù có lỗi hay không
    toast.promise(
      dispatch(updateUserApi(reqData)),
      { pending: 'Uploading...' }
    ).then(res => {
      if (!res.error) {
        toast.success('User updated successfully')
      }
      //clear value input
      e.target.value = ''
    })
    //log dữ liệu thông qua form data
    for (const value of reqData.values()) {
      console.log('reqData value: ', value)
    }

  }
  return (
    <Container sx={{
      display: 'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      mt:3
    }}>
      <Box sx={{ display:'flex', gap: 2, alignItems:'center', mb: 3 }}>
        <Box>
          <Avatar
            src={currentUser?.avatar}
            sx={{ width: 84, height: 84, mb: 1 }}
          />
          <Tooltip title='Upload a new image to update your avatar.'>
            <Button
              component="label"
              variant="contained"
              color='submit'
              size='small'
              startIcon={<CloudUploadIcon sx={{ color:'#fff' }}/>}
            >
            Upload
              <VisuallyHiddenInput
                type="file"
                onChange={uploadAvatar}
              />
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Typography variant='h6'>{currentUser?.displayName}</Typography>
          <Typography sx={{ color: 'grey' }}>@{currentUser?.username}</Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(submitChangeGeneralInformation)}>
        <Box sx={{ width:'400px', mb: 3 }}>
          <Box sx={{ display:'flex', flexDirection:'column', gap: 2 }}>
            <TextField
              label='Your email'
              disabled
              type='text'
              defaultValue={currentUser?.email}
              fullWidth
              variant='filled'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <MailIcon fontSize='small'/>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label='Your Username'
              disabled
              type='text'
              defaultValue={currentUser?.username}
              fullWidth
              variant='filled'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AccountBoxIcon fontSize='small'/>
                  </InputAdornment>
                )
              }}
            />
            <Box>
              <TextField
                label='Your Display Name'
                type='text'
                error={!!errors['displayName']}
                {...register('displayName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
                fullWidth
                variant='filled'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountBoxIcon fontSize='small'/>
                    </InputAdornment>
                  )
                }}
              />
              <FieldErrorAlert error={errors} fieldName='displayName' />
            </Box>
          </Box>
        </Box>
        <ButtonLoading
          type='submit'
          variant='contained'
          color='submit'
          fullWidth
          loadingKey={LOADING_KEY.auth.updateProfile}
        >
          Update
        </ButtonLoading>
      </form>
    </Container>
  )
}
