// Authentication - signin/signup

import { Box, useTheme } from '@mui/material'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useMemo, useState } from 'react'
import LoginForm from './LoginForm'
import { useLocation, useNavigate } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { resetLoading } from '~/redux/loading/loadingSlice'
import { LOADING_KEY } from '~/utils/constants'
import { selectCurrentUser } from '~/redux/user/userSlice'
const BoxMotion = motion(Box)

export default function Auth() {
  const [init, setInit] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const mode = theme.palette.mode
  const dispatch = useDispatch()
  const isLogin = location.pathname === '/login'
  const isRegister = location.pathname === '/register'
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true })
    }
    const initParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
      setInit(true)
    }
    initParticles()
    return () => {
      if (isLogin) {
        dispatch(resetLoading(LOADING_KEY.auth.login))
      }

      if (isRegister) {
        dispatch(resetLoading(LOADING_KEY.auth.register))
      }
    }
  }, [isLogin, isRegister, dispatch, currentUser, navigate])

  const getOptions = (mode) => (
    {
      'fpsLimit': 120,
      'particles': {
        'number': {
          'value': 50
        },
        'shape': {
          'type': 'circle'
        },
        'opacity': {
          'value': 0.3
        },
        'size': {
          'value': 400,
          'random': {
            'enable': false,
            'minimumValue': 200
          }
        },
        'move': {
          'enable': true,
          'speed': 10,
          'direction': 'top',
          'outMode': 'destroy'
        },
        'color': {
          'value': mode === 'light' ? [
            '#a0c4ff',
            '#bdb2ff',
            '#ffc6ff',
            '#ffd6a5',
            '#fdffb6',
            '#caffbf'
          ]:[
            '#5bc0eb',
            '#fde74c',
            '#9bc53d',
            '#e55934',
            '#fa7921',
            '#c3423f'
          ]
        }
      },
      'detectRetina': true,
      'background': {
        'image': '',
        'position': '50% 50%',
        'repeat': 'no-repeat',
        'size': 'cover',
        'color': mode === 'light' ? '#fff' : '#0f0f1a'
      }
    })
  const particlesOptions = useMemo(() => getOptions(mode), [mode])

  if (!init) return null
  return (
    <>
      <Particles options={particlesOptions} />
      {/* Authentication Form */}
      <Box sx={{
        position:'absolute',
        inset:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        background:mode === 'dark'
          ? 'rgba(255,255,255,0.05)'
          : 'rgba(255,255,255,0.6)',
        border:
    mode === 'dark'
      ? '1px solid rgba(255,255,255,0.2)'
      : '1px solid rgba(0,0,0,0.1)',
        color: mode === 'dark' ? '#fff' : '#000'
      }}>
        <BoxMotion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          width={360}
        >
          <Box sx={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter:'blur(10px)',
            padding: '2rem',
            borderRadius: '8px',
            border: '1px solid rgb(0, 0, 0)'
          }}>
            { isLogin && <LoginForm /> }
            { isRegister && <RegisterForm /> }
          </Box>
        </BoxMotion>
      </Box>
    </>

  )
}
