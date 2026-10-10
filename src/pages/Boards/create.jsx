import { Box, Button, FormControlLabel, IconButton, InputAdornment, ListItemIcon, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import AbcIcon from '@mui/icons-material/Abc'
import { Controller, useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import { SidebarItem } from './index'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

const BOARD_TYPES = {
  PRIVATE: 'private',
  PUBLIC: 'public'
}

export default function SideBarCreateBoardModal() {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm()
  const [isOpen, setOpen] = useState(false)
  const handleCreateBoard = (data) => {
    console.log(data)

  }
  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
    reset()
  }

  return (
    <>
      <SidebarItem onClick={handleOpenModal}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <Typography variant='body1' fontWeight='bold'>
            Create a new board
        </Typography>
      </SidebarItem>

      <Modal open={isOpen}>

        <Box sx={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          boxShadow: 24,
          p: 4,
          backgroundColor: theme => theme.palette.mode === 'dark' ? '#424242' : '#fff',
          borderRadius: '8px'
        }}>
          <Box mb={3} display='flex' gap={2} alignItems='center'>
            <AddToPhotosIcon />
            <Typography variant='h6' fontWeight='bold'>
               Create a new board
            </Typography>
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 8, right: 8 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(handleCreateBoard)}>
            <Box sx ={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <TextField
                  fullWidth
                  label='Title'
                  variant='outlined'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <AbcIcon />
                      </InputAdornment>
                    )
                  }}
                  {...register('title', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: { value: 3, message: 'Title must be at least 3 characters' },
                    maxLength: { value: 50, message: 'Title must be at most 50 characters' }
                  })}
                  error={!!errors['title']}
                />
                <FieldErrorAlert error={errors} fieldName={'title'} />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label='Description'
                  type='text'
                  variant='outlined'
                  multiline
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <DescriptionOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                  {...register('description', {
                    required: FIELD_REQUIRED_MESSAGE,
                    minLength: { value: 3, message: 'Description must be at least 3 characters' },
                    maxLength: { value: 200, message: 'Description must be at most 200 characters' }
                  })}
                  error={!!errors['description']}
                />
                <FieldErrorAlert error={errors} fieldName='description' />
              </Box>
              {/* Radio group không dùng register như TextField,
             phải dùng Controller và props control của react-hook-form */}
              <Box>
                <Controller name='type'
                  control={control}
                  defaultValue={BOARD_TYPES.PRIVATE}
                  rules={{
                    required: FIELD_REQUIRED_MESSAGE
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                    >
                      <FormControlLabel
                        value={BOARD_TYPES.PRIVATE}
                        control={<Radio />}
                        label="Private"
                        labelPlacement='start'
                      />
                      <FormControlLabel
                        value={BOARD_TYPES.PUBLIC}
                        control={<Radio />}
                        label="Public"
                        labelPlacement='start'
                      />
                    </RadioGroup>
                  )}
                >
                </Controller>
                <FieldErrorAlert error={errors} fieldName='type' />
              </Box>
            </Box>
            <Button type='submit' variant='contained' color='primary' sx={{ mt: 3, alignSelf: 'flex-end' }}>
              Create
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}
