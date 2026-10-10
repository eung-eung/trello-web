//Board list

import { Box, Button, Card, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, PaginationItem, styled, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Article from '@mui/icons-material/Article'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import randomColor from 'randomcolor'
import { Link, useLocation } from 'react-router-dom'
import SideBarCreateBoardModal from './create'
const sideBarItems = [
  {
    title: 'Boards',
    icon: DashboardIcon
  },
  {
    title: 'Templates',
    icon: Article
  },
  {
    title: 'Home',
    icon: HomeIcon
  }
]

export const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#5050501b' : '#7955480f'
  },
  '&.active': {
    backgroundColor: theme.palette.mode === 'dark' ? '#505050a4' : '#7955483b',
    color: theme.palette.mode === 'dark' ? '#fff' : '#795548'
  }
}
))

function BoardList() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page') || '1', 10)

  return (<>
    <Grid container spacing={3}>
      <Grid size={3}>
        <List>
          {sideBarItems.map((item, index) => (
            <ListItem key={index}>
              <SidebarItem className={index === 0 && 'active'}>
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <Typography variant='body1' fontWeight='bold'>
                  {item.title}
                </Typography>
              </SidebarItem>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <SideBarCreateBoardModal />
          </ListItem>
        </List>
      </Grid>
      {/* board list */}
      <Grid size={9}>
        <Typography variant='h4' fontWeight='bold' textAlign='center' mt={2}>
          Your boards
        </Typography>
        <Grid container spacing={2} mt={5} mr={5}>
          {/* board item */}
          {Array(15).fill().map((_, index) => (
            <Grid size={{
              xs: 12,
              sm: 6,
              md: 4
            }}>
              <Card variant='elevation'>
                <Box sx={{
                  height: 100,
                  backgroundColor: randomColor()
                }}/>
                <CardContent>
                  <Typography variant='h5' fontWeight='bold'>
                Board title
                  </Typography>
                  <Typography variant='body2' textOverflow={'ellipsis'} whiteSpace='nowrap' overflow='hidden'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis quia dicta unde ea odit minus illum reiciendis? Suscipit doloremque voluptas et, esse cumque error dignissimos sit aliquam saepe dolore atque!
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size='small'>Go to board  <ArrowRightIcon /></Button>
                </CardActions>
              </Card>
            </Grid>
          ))}

        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 10, pb:5, pt: 2 }}>
          <Pagination
            page={page}
            count={16}
            variant='outlined'
            color='secondary'
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/boards${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
      </Grid>
    </Grid>
  </>)
}

export default BoardList
