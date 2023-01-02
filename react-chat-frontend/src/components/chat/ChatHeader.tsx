import React from 'react'
import ActionIcon from '../common/ActionIcon'
import { MdArrowLeft } from 'react-icons/md'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const ChatHeader = ({ activeChat }: any) => {
  return (
    <>
      <div className='p-2 w-full h-14 bg-white shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <ActionIcon className='md:hidden' /* @click="closeChat" */>
            <MdArrowLeft size='32' color='#707579' />
          </ActionIcon>
          <div className='flex gap-2 items-center'>
            <img src={activeChat.avatar ? activeChat.avatar : '/user.svg'} className='w-8 h-8' />
            <div className='font-medium text-lg'>{activeChat.username}</div>
          </div>
        </div>
        <ActionIcon>
          <HiOutlineDotsVertical size='24' color='#707579' />
        </ActionIcon>
      </div>
    </>
  )
}

export default ChatHeader
