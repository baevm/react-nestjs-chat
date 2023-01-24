import React, { useRef } from 'react'
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoClose, IoInformationCircleOutline } from 'react-icons/io5'
import { useTimeout } from './helpers/useTimeout'
import { ToastOptions, ToastType } from './ToastProvider'

export interface ToastProps extends ToastOptions {
  close: () => void
}

const IconTypes: Record<ToastType, React.ReactNode> = {
  error: <IoAlertCircleOutline color='red' />,
  info: <IoInformationCircleOutline color='blue' />,
  success: <IoCheckmarkCircleOutline color='green' />,
}

export const Toast = (props: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null)
  useTimeout(props.close, props.time as number)

  return (
    <div
      ref={toastRef}
      className=' bg-white min-h-[2.5rem] min-w-[15rem] max-w-[4.5rem] rounded p-3 z-[999999] 
        flex justify-start items-start flex-col gap-2
        
        border-border-color border-[1px]'>
      <div className='flex justify-between w-full'>
        <div className='flex gap-2'>
          {IconTypes[props.type]}
          <span className='font-medium'>{props.title}</span>
        </div>
        <button onClick={props.close}>
          <IoClose size='14' />
        </button>
      </div>
      <div>{props.text}</div>
    </div>
  )
}
