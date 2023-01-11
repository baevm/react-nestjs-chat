import React from 'react'

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className='min-w-[1.25rem] h-[1.25rem] ml-[0.5rem] rounded-[0.75rem] px-[0.3125rem] leading-[1.3125rem] 
      text-sm text-center bg-badge-background-color text-badge-color font-bold'>
      {children}
    </div>
  )
}

export default Badge
