import { Button, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

export default function ButtonLoading({
  children,
  loadingKey,
  disabled,
  ...props
}) {
  const isLoading = useSelector(state => state.loading.map[loadingKey] > 0)
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      startIcon={isLoading ? <CircularProgress size={16} /> : props.startIcon}
    >
      {children}
    </Button>
  )
}
