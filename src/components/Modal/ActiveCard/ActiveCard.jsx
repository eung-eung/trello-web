import { Box, Grid, Modal, Typography } from '@mui/material'
import { useState } from 'react'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

import CardUserGroup from './CardUserGroup'

import CancelIcon from '@mui/icons-material/Cancel'
import TitleIcon from '@mui/icons-material/Title'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import CommentIcon from '@mui/icons-material/Comment'
import CardActivitySection from './CardActivitySection'
export default function ActiveCard() {
  const [open, setOpen] = useState(true)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}

    >
      <Box sx={{
        position: 'relative',
        width: 900,
        maxWidth: 900,
        borderRadius: '8px',
        padding: '40px 20px 20px',
        margin: '50px auto',
        outline: 0,
        maxHeight: '90vh',
        overflowY:'scroll',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}>
        <Box
          sx={{
            position: 'absolute',
            right: '10px',
            top: '10px'
          }}
        >
          <CancelIcon onClick={handleClose} sx={{ '&:hover': { opacity: 0.8 }, color: 'red', cursor: 'pointer' }}/>
        </Box>
        <img
          src='https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/facebook-cover-photo-header.jpg' 
          style={{ width: '100%', objectFit: 'contain', borderRadius: '8px' }}
        />
        {/* feature 1: xử lí tiêu đề của card */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TitleIcon sx={{ mr: 3 }}/>
          <ToggleFocusInput value={'title'} fontSize={22}/>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* left side */}
          <Grid size={{ xs: 12, sm: 9 }}>
            <Box>
              <Typography variant='body1' color='info' sx={{ fontWeight: '600', mb: 1 }}>Members</Typography>

              {/* feature 2: xử lí các thành viên của card */}
              <CardUserGroup />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Description</Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CommentIcon />
                <Typography variant='span' sx={{ fontWeight: '600', fontSize: '20px' }}>Activity</Typography>
              </Box>

              {/* feature 04: xử lí hành động, ví dụ comment vào Card */}
              <CardActivitySection />
            </Box>
          </Grid>
          {/* right side */}
          <Grid size={{ xs: 12, sm: 3 }}>
            asdasd
          </Grid>
        </Grid>
      </Box>

    </Modal>
  )
}
