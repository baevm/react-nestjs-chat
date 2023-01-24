import React from 'react'

const ErrorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <p role='alert' className='text-red-500 text-sm self-start'>
      {children}
    </p>
  )
}

export default ErrorText
