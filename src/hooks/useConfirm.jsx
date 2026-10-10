import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { useInteractionLock } from '~/contexts/InteractionLockProvider'

export default function useConfirm(title, message, icon) {
  const [promise, setPromise] = useState(null)
  const { lock, unlock } = useInteractionLock()

  const confirm = () => {
    lock()
    return new Promise((resolve) => { setPromise({ resolve }) })
  }

  const handleClose = (event, reason) => {
    // chặn đóng dialog khi click bên ngoài
    if (reason && reason === 'backdropClick') return
    unlock()
    setPromise(null)
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const ConfirmDialog = () => (
    <Dialog
      open={promise !== null}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ display:'flex', alignItems:'center', gap: 1 }} id="alert-dialog-title">
        {icon}
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} variant='contained'>
            Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
  return [confirm, ConfirmDialog]
}
