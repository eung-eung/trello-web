import { createContext, useContext, useMemo, useState } from 'react'

const InteractionLockContext = createContext(null)

export function InteractionLockProvider({ children }) {
  const [locked, setLocked] = useState(false)
  const value = useMemo(() => (
    {
      locked,
      lock: () => setLocked(true),
      unlock: () => setLocked(false)
    }
  ), [locked])

  return (
    <InteractionLockContext.Provider value={value}>
      {children}
    </InteractionLockContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInteractionLock() {
  const context = useContext(InteractionLockContext)
  if (!context) {
    throw new Error(
      'useInteractionLock must be used inside InteractionLockProvider'
    )
  }
  return context
}