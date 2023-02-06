import React from 'react'

export const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className='bg-badge-background-color text-badge-color ml-[0.5rem] h-[1.25rem] min-w-[1.25rem] max-w-[2.5rem] rounded-[0.75rem] 
      px-[0.3125rem] text-center text-sm font-bold leading-[1.3125rem]'>
      {children}
    </div>
  )
}
