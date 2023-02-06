import React, { InputHTMLAttributes } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='focus:border-active-item-color w-full rounded-md border-[1px] border-[#dadce0] p-2 focus:outline-none'
    />
  )
})

AuthInput.displayName = 'AuthInput'

export default AuthInput
