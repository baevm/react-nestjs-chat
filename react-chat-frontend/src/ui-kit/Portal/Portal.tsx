import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: React.ReactNode
  target?: HTMLElement | string
  className?: string
}

export const Portal = ({ children, target, className }: PortalProps) => {
  const ref = useRef<HTMLElement>()
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    setIsMounted(true)

    if (!target) {
      ref.current = document.createElement('div')
    } else if (typeof target === 'string') {
      ref.current = document.querySelector(target) as HTMLElement
    } else {
      ref.current = target
    }

    if (!target) {
      document.body.appendChild(ref.current)
    }

    return () => {
      !target && document.body.removeChild(ref.current!)
    }
  }, [target])

  if (!isMounted) return null

  return createPortal(<div id='portal' className={className}>{children}</div>, ref.current!)
}
