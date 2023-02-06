import React from 'react'

const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p role='alert' className='self-start text-sm text-red-500'>
      {children}
    </p>
  )
}

export default ErrorText
