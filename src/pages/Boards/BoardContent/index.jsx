import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) =>
          `calc(100vh - ${theme.custom.boardBarHeight} - ${theme.custom.appBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Content
    </Box>
  )
}

export default BoardContent
