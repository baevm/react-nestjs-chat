import React, { createContext, useContext, useMemo, useState } from 'react'
import { Portal } from '../Portal'
import { Toast } from './Toast'

let generateId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export type ToastType = 'error' | 'success' | 'info'
export type ToastPostion = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface ToastOptions {
  title?: React.ReactNode
  text?: React.ReactNode
  type: ToastType
  position?: ToastPostion
  withCloseButton?: boolean
  time?: number
}

const CLOSE_TIME = 5000

const POSITIONS: Record<ToastPostion, string> = {
  'bottom-left': 'left-4 bottom-4 animate-toast-left',
  'bottom-right': 'right-4 bottom-4 animate-toast-right',
  'top-left': 'left-4 top-4 animate-toast-left',
  'top-right': 'right-4 top-4 animate-toast-right',
}

export const ToastContext = createContext<null | any>(null)

export const ToastProvider = ({ ...props }) => {
  const [toasts, setToasts] = useState<{ id: string; options: ToastOptions }[]>([])

  const show = (options: ToastOptions) => setToasts((curr) => [...curr, { id: generateId(), options }])

  const close = (id: string) => setToasts((curr) => curr.filter((toast) => toast.id !== id))

  const contextValue = useMemo(() => ({ show }), [])

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {toasts.length > 0 && (
        <Portal>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`${
                toast.options.position ? POSITIONS[toast.options.position] : POSITIONS['bottom-left']
              } fixed flex flex-col gap-2 will-change-transform`}>
              <Toast
                close={() => close(toast.id)}
                title={toast.options.title}
                type={toast.options.type}
                text={toast.options.text}
                time={toast.options.time ?? CLOSE_TIME}
              />
            </div>
          ))}
        </Portal>
      )}
    </ToastContext.Provider>
  )
}

export default ToastProvider
