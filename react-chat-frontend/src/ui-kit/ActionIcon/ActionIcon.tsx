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
      {...props}
      className={`cursor-pointer border-0 rounded-full p-2 transition-all hover:bg-icon-hover-color active:scale-90 ${className}`}>
      {isLoading ? <Loader /> : children}
    </button>
  )
}
