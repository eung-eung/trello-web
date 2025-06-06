import Button from '@mui/material/Button'
import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'

function App() {

  return (
    <>
      <div>sadasdasdasd</div>
      {/* <Chat /> */}
      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />

      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
