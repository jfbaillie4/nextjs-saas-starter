"use client"

import { createContext, useContext, useState } from 'react'

interface MobileHeaderContextValue {
  title: string
  setTitle: (title: string) => void
}

const MobileHeaderContext = createContext<MobileHeaderContextValue>({
  title: '',
  setTitle: () => {},
})

export function MobileHeaderProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('')

  return (
    <MobileHeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </MobileHeaderContext.Provider>
  )
}

export function useMobileHeader() {
  return useContext(MobileHeaderContext)
}
