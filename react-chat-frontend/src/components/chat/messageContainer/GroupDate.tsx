import React from 'react'

const GroupDate = ({ date }: { date: string }) => {
  return (
    <div className='flex items-center justify-center text-white'>
      <div className='bg-patern-color rounded-xl px-2 text-sm'>{date}</div>
    </div>
  )
}

export default GroupDate
