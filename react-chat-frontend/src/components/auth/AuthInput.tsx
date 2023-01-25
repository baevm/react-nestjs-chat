import React, { InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='w-full p-2 rounded-md border-[#dadce0] border-[1px] focus:border-active-item-color focus:outline-none'
    />
  )
})

AuthInput.displayName = 'AuthInput'

export default AuthInput
