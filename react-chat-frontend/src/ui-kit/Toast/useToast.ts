import { useContext } from 'react'
import { ToastContext, ToastOptions } from './ToastProvider'

interface UseToast {
  show: (options: ToastOptions) => void
}

export function useToast() {
  const context: UseToast = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast called outside of ToastProvider')
  }

  return context
}
