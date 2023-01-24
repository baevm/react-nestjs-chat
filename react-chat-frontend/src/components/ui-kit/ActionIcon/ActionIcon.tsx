import React, { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: React.ComponentProps<'button'>['className']
}

export const ActionIcon = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`cursor-pointer border-0 rounded-full p-2 transition-all hover:bg-icon-hover-color active:scale-90 ${className}`}>
      {children}
    </button>
  )
}
