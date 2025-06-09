import { useColorScheme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  if (!mode) return null

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' />
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize='small' />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SettingsBrightnessIcon fontSize='small' />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        height: (theme) => theme.custom.appBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        height: (theme) => theme.custom.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Board bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        height: (theme) => (`calc(100vh - ${theme.custom.boardBarHeight} - ${theme.custom.appBarHeight})`),
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        Content
      </Box>
    </Container>
  )
}

export default App
