import { Route, Routes, Navigate } from 'react-router-dom'

import Board from '~/pages/Boards/_id'
import NotFound from './pages/404/NotFound'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/boards/69d5fa000905b348bbce8505" replace={true} />} />
      {/* board detail */}
      <Route path="/boards/:boardId" element={<Board />} />

      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
