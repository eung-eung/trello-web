//Board list

import { Box, Button, Card, CardActions, CardContent, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, PaginationItem, styled, Tooltip, Typography } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Article from '@mui/icons-material/Article'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import randomColor from 'randomcolor'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SideBarCreateBoardModal from './create'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardListAPI, selectBoardList } from '~/redux/boardList/boardListSlice'
import { useEffect } from 'react'
import SectionLoading from '~/components/Loading/SectionLoading'
import { LOADING_KEY } from '~/utils/constants'
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
  const dispatch = useDispatch()
  const boards = useSelector(selectBoardList)
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const page = parseInt(queryParams.get('page') || '1', 10)

  useEffect(() => {
    if ( page < 1 || (page > boards.totalPages && boards.totalPages > 0)) {
      navigate('/boards?page=1', { replace: true })
      return
    }

    dispatch(fetchBoardListAPI({ page, limit: 10 }))
  }, [dispatch, page, boards.totalPages, navigate])

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
        <SectionLoading loadingKey={LOADING_KEY.board.getBoardList}>
          <Grid container spacing={2} mt={5} mr={5}>
            {/* board item */}
            {boards.boardList.map((board) => (
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
                    <Tooltip title={board.title} placement='top-start'>
                      <Typography variant='h5' fontWeight='bold' sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {board.title}
                      </Typography>
                    </Tooltip>

                    <Typography variant='body2' textOverflow={'ellipsis'} whiteSpace='nowrap' overflow='hidden'>
                      {board.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button onClick={() => navigate(`/boards/${board._id}`)} size='small'>Go to board  <ArrowRightIcon /></Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 10, pb:5, pt: 2 }}>
            <Pagination
              page={page}
              count={boards.totalPages}
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
        </SectionLoading>
      </Grid>
    </Grid>
  </>)
}

export default BoardList
