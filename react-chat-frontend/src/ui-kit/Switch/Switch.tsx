import React, { HTMLAttributes } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean
}

export const Switch = ({ checked, ...props }: SwitchProps) => {
  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input {...props} type='checkbox' checked={checked} className='peer sr-only' />
      <div
        className="peer-checked:bg-active-item-color peer h-5 w-9 
        rounded-full bg-gray-300 
      after:absolute after:top-[2px] after:left-[2px] after:h-4 
      after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all 
      after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></div>
    </label>
  )
}
