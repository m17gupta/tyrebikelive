'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface DomainHandlerProps {
  children: React.ReactNode
  fallbackContent?: React.ReactNode
}

export function DomainHandler({ children, fallbackContent }: DomainHandlerProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Handle domain-specific logic on client side
    const domain = window.location.hostname
    
    // You can add domain-specific redirects or logic here
    if (domain !== 'localhost' && !domain.includes('vercel.app')) {
      // Custom domain logic
      console.log('Custom domain detected:', domain)
    }
  }, [router])

  if (!mounted) {
    return fallbackContent || <div>Loading...</div>
  }

  return <>{children}</>
}
