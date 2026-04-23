import { Box, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'

export default function SectionLoading({ children, loadingKey}) {
  const loading = useSelector(state => state.loading.map[loadingKey] > 0)
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} color='white'/>
      </Box>
    )
  }
  return children
}
