import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'

const SearchInput = () => {
  return (
    <div className='rounded-3xl bg-input-secondary-color w-full p-2'>
      <MdOutlineSearch color='lightgray' className='absolute' />
      <input placeholder='Search' className='bg-transparent pl-[2rem] border-0 outline-none' />
    </div>
  )
}

export default SearchInput
