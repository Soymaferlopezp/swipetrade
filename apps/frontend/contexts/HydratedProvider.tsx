'use client'

import { useState, useEffect, ReactNode } from 'react'

export const HydratedProvider = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated ? <>{children}</> : null
}