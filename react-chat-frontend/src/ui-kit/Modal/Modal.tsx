import useClickOutside from '@hooks/useClickOutside'
import React, { useEffect, useRef } from 'react'
import { Portal } from '../Portal'

interface ModalProps {
  children: any
  isOpened: boolean
  onClose: () => void
  className?: React.ComponentProps<'div'>['className']
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
}

export const Modal = ({
  children,
  isOpened,
  onClose,
  className,
  closeOnClickOutside = true,
  closeOnEscape = true,
}: ModalProps) => {
  const modalBodyRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalBodyRef, (e) => {
    if (!closeOnClickOutside) {
      return null
    } else {
      onClose()
    }
  })

  useEffect(() => {
    function handleEscPress(e: KeyboardEvent) {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscPress)

    return () => {
      document.removeEventListener('keydown', handleEscPress)
    }
  }, [])

  if (!isOpened) return null

  return (
    <Portal>
      <div id='modal-wrapper' className='bg-modal-background fixed top-0 left-0 z-50 h-full w-full'>
        <div
          id='modal-body'
          className={`flex h-full w-full flex-col items-center justify-center ${className ? className : ''}`}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { ref: modalBodyRef })
          })}
        </div>
      </div>
    </Portal>
  )
}
