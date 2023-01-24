import React, { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from 'react'
import { Loader } from '../Loader/'

type ButtonVariants = 'filled' | 'light' | 'subtle'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
  className?: React.ComponentProps<'button'>['className']
  icon?: React.ReactNode
  variant?: ButtonVariants
}

const variantStyles = {
  filled: 'text-white bg-active-item-color',
  light: 'text-active-item-color bg-background-color border-[1px] border-active-item-color',
  subtle: 'text-active-item-color hover:bg-[#f4f4f5]',
}

const loaderColors = {
  filled: 'white',
  light: 'var(--active-item-color)',
  subtle: 'var(--active-item-color)',
}

export const Button = ({ children, isLoading, className, icon, variant = 'subtle', ...props }: ButtonProps) => {
  const style: React.HTMLProps<HTMLElement>['className'] = `${className} relative flex items-center py-2 px-2 rounded-md cursor-pointer ${variantStyles[variant]}`
  const color = loaderColors[variant]

  return (
    <button {...props} className={style} disabled={isLoading}>
      {icon && <span className='mr-2'>{icon}</span>}
      {isLoading && (
        <span className='mr-2'>
          <Loader color={color} />
        </span>
      )}
      <span className='font-medium'>{children}</span>
    </button>
  )
}
