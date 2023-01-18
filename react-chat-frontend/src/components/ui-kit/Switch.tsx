import React, { HTMLAttributes } from 'react'

interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
  checked: boolean
}

const Switch = ({ checked, ...props }: SwitchProps) => {
  return (
    <label className='relative inline-flex items-center cursor-pointer'>
      <input {...props} type='checkbox' checked={checked} className='sr-only peer' />
      <div
        className="w-9 h-5 bg-gray-300 peer-focus:outline-none 
        rounded-full peer 
      dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
      after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border 
      after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-active-item-color"></div>
    </label>
  )
}

export default Switch
