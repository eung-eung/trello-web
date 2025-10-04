import { useTheme } from '@mui/material'
import { ToastContainer } from 'react-toastify'

export default function CustomToastifyContainer() {
  const theme = useTheme()

  return (
    <ToastContainer theme={theme?.palette?.mode} />
  )
}
