import { TextField } from '@mui/material'
import { useRef, useState } from 'react'

export default function ToggleFocusInput({ value, handleChange, handleUpdate, handleKeydownEsc }) {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef(null)
  const skipBlurUpdate = useRef(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      skipBlurUpdate.current = true
      handleUpdate()
      setIsEditing(false)
      inputRef.current.blur()
    }

    if (e.key === 'Escape') {
      skipBlurUpdate.current = true
      handleKeydownEsc()
      inputRef.current.blur()
      setIsEditing(false)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (skipBlurUpdate.current) {
      skipBlurUpdate.current = false
      return
    }
    handleUpdate()
  }

  return (
    <TextField
      inputRef={inputRef}
      variant="standard"
      onFocus={() => setIsEditing(true)}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      size="medium"
      sx={(theme) => ({
        '& .MuiInputBase-input': {
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: isEditing ? 'text' : 'pointer'
        },
        '& .MuiInput-underline:before': {
          borderBottomColor:  'transparent'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'transparent'
        },
        '& .MuiInput-underline:after': {
          borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'white' : 'currentColor'}`
        }
      })}
    />
  )
}
