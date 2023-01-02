import React from 'react'
import { MdOutlineSearch } from 'react-icons/md'

const SearchInput = () => {
  return (
    <div className='rounded-3xl bg-[#F4F4F5] w-full p-2 relative'>
      <MdOutlineSearch color='lightgray' className='absolute' />
      <input placeholder='Search' className='bg-transparent pl-[2rem] border-0 outline-none' />
    </div>
  )
}

export default SearchInput
