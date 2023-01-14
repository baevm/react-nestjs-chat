import React, { InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AuthInput = ({ ...props }: AuthInputProps) => {
  return (
    <input
      {...props}
      className='w-full p-2 rounded-md border-[#dadce0] border-[1px] focus:border-active-item-color focus:outline-none'
    />
  )
}

export default AuthInput
