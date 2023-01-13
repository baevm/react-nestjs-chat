import React from 'react'

const GroupDate = ({ date }: { date: string }) => {
  return (
    <div className='flex items-center justify-center text-white'>
      <div className='rounded-xl bg-patern-color px-2 text-sm'>{date}</div>
    </div>
  )
}

export default GroupDate
