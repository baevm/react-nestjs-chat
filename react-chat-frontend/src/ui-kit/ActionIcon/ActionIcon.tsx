import React, { HTMLAttributes } from 'react'
import { Loader } from '../Loader'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: React.ComponentProps<'button'>['className']
  isLoading?: boolean
}

export const ActionIcon = ({ children, className, isLoading, ...props }: ButtonProps) => {
  return (
    <button
      disabled={isLoading}
      data-loading={isLoading || undefined}
      {...props}
      className={`hover:bg-icon-hover-color cursor-pointer rounded-full border-0 p-2 transition-all active:scale-90 ${className}`}>
      {isLoading ? <Loader /> : children}
    </button>
  )
}
