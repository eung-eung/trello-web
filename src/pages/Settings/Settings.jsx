import { Link, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Container } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import AccountTab from './AccountTab'
import SecurityTab from './SecurityTab'

const TABS = {
  ACCOUNT: {
    value: 'account',
    icon: PersonIcon,
    component: AccountTab
  },
  SECURITY: {
    value: 'security',
    icon: SecurityIcon,
    component: SecurityTab
  }
}

export default function Settings() {
  const location = useLocation()

  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY.value)) return TABS.SECURITY.value
    return TABS.ACCOUNT.value
  }

  const ActiveComponent = Object.values(TABS).find(tab => tab.value === getDefaultTab()).component

  const handleChange = (event, value) => {
    // setActiveTab(value)
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box sx={{ borderBottom: 1, borderColor:'divider' }}>
        <Tabs value={getDefaultTab()} onChange={handleChange}>
          {Object.values(TABS).map(tab => (
            <Tab
              label={tab.value}
              value={tab.value}
              icon={<tab.icon />}
              iconPosition='start'
              component={Link}
              to={`/settings/${tab.value}`}
            />
          ))}
        </Tabs>
      </Box>
      { ActiveComponent && <ActiveComponent /> }
    </Container>
  )
}
