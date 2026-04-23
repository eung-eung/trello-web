import { FormHelperText } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
const shake = {
  '@keyframes shake': {
    '0%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-4px)' },
    '50%': { transform: 'translateX(4px)' },
    '75%': { transform: 'translateX(-4px)' },
    '100%': { transform: 'translateX(0)' }
  }
}

export default function FieldErrorAlert({ error, fieldName }) {
  if (!error || !error[fieldName]) return null
  return (
    <FormHelperText sx={{
      shake,
      fontSize: 13,
      ml: 0.5, mr: 0.5,
      animation: 'shake 0.3s',
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
      color: '#ff0000',
      fontWeight: 500
    }}>
      <ErrorOutlineOutlinedIcon sx={{ color: '#ff0000' }} />
      {error[fieldName].message}
    </FormHelperText>
  )
}
