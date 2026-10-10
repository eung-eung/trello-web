import { Route, Routes, Navigate, Outlet } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import AppBar from './components/AppBar/AppBar'
import BoardList from './pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  )
}
function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      {/* Redirect route */}
      <Route path='/' element={
        <Navigate to="/boards/69d5fa000905b348bbce8505" replace={true} />
      } />
      <Route element={<ProtectedRoute user={currentUser}/>}>
        {/* board detail */}
        <Route path="/boards/:boardId" element={<Board />} />

        {/* board list */}
        <Route path="/boards" element={<BoardList />} />

        {/* setting */}
        <Route path='settings/account' element={<Settings />}/>
        <Route path='settings/security' element={<Settings />}/>
      </Route>

      {/* Authentication */}
      <Route path='/login' element={ <Auth /> }/>
      <Route path='/register' element={ <Auth /> } />
      <Route path='/account/verification' element={ <AccountVerification /> } />

      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
