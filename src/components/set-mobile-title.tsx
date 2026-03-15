"use client"

import { useEffect } from 'react'
import { useMobileHeader } from './mobile-header-context'

interface SetMobileTitleProps {
  title: string
}

export function SetMobileTitle({ title }: SetMobileTitleProps) {
  const { setTitle } = useMobileHeader()

  useEffect(() => {
    setTitle(title)
    return () => setTitle('')
  }, [title, setTitle])

  return null
}
