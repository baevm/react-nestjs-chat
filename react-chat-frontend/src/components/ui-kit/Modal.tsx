import useClickOutside from '@hooks/useClickOutside'
import React, { useRef } from 'react'
import Portal from './Portal'

interface ModalProps {
  children: any
  isOpened: boolean
  onClose: () => void
  className?: React.ComponentProps<'div'>['className']
  closeOnClickOutside?: boolean
}

const Modal = ({ children, isOpened, onClose, className, closeOnClickOutside = true }: ModalProps) => {
  const modalBodyRef = useRef<HTMLDivElement | null>(null)

  useClickOutside(modalBodyRef, (e) => {
    if (!closeOnClickOutside) {
      return null
    } else {
      onClose()
    }
  })

  if (!isOpened) return null

  return (
    <Portal>
      <div id='modal-wrapper' className='w-full h-full fixed z-50 top-0 left-0 bg-modal-background'>
        <div
          id='modal-body'
          className={`flex items-center justify-center flex-col w-full h-full ${className ? className : ''}`}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { ref: modalBodyRef })
          })}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
