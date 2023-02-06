import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'

const SearchInput = () => {
  return (
    <div className='bg-input-secondary-color w-full rounded-3xl p-2'>
      <MdOutlineSearch color='lightgray' className='absolute' />
      <input placeholder='Search' className='w-full border-0 bg-transparent pl-[2rem] outline-none' />
    </div>
  )
}

export default SearchInput
