import Particles, { initParticlesEngine} from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'

const MotionTypography = motion(Typography)
const MotionButton = motion(Button)

const FloatingNumber = ({ children, delay = 0 }) => {
  return (
    <MotionTypography
      variant="h1"
      sx={{
        fontSize: '10rem',
        fontWeight: 'bold',
        textShadow: `
            0 0 10px #fff,
            0 0 20px #0ff,
            0 0 40px #0ff,
            0 0 80px #0ff
          `
      }}
      initial={false}
      animate={{
        y: [0, -30, 0],
        rotate: [-2, 2, -2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay
      }}
    >
      {children}
    </MotionTypography>
  )
}

export default function NotFound() {
  const navigate = useNavigate()
  const [init, setInit] = useState(false)

  useEffect(() => {
    const initParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
      setInit(true)
    }

    initParticles()
  }, [])


  if (init) {
    return (
      <div>
        {/*  Galaxy background */}
        <Particles
          options={{
            fullScreen:true,
            background: { color: '#000' },
            particles: {
              number: { value: 120 },
              color: { value: '#ffffff' },
              move: { enable: true, speed: 0.3 },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: 0.7 }
            }
          }}
        />

        {/* 🚀 Content */}
        <Box sx={{
          position:'absolute',
          inset:0,
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexDirection:'column'
        }}>
          <Box sx={{ display:'flex', flexDirection:'row' }}>
            <FloatingNumber delay={0}>4</FloatingNumber>
            <FloatingNumber delay={0.5}>0</FloatingNumber>
            <FloatingNumber delay={1}>4</FloatingNumber>
          </Box>

          {/* 🚀 Button */}
          <MotionButton
            variant="outlined"
            sx={{
              mt: 4,
              px: 4,
              borderRadius: '20px',
              background:'#000',
              color: '#fff',
              borderColor: '#fff',
              boxShadow: '0 0 8px rgba(255,255,255,0.3)'
            }}
            whileHover={{
              boxShadow: '0 0 20px rgba(255,255,255,0.8)',
              transition: { duration: 0.1 }
            }}
            onClick={() => navigate('/', { replace: true })}
          >
            Go Home
          </MotionButton>

        </Box>
      </div>
    )
  }

  return <></>
}
