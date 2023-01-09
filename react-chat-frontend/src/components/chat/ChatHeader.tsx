import React, { useState } from 'react'
import ActionIcon from '../common/ActionIcon'
import { IoArrowBack } from 'react-icons/io5'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import useUiStore from '@store/uiStore'
import { useRouter } from 'next/router'
import Menu from '@components/common/Menu'

const ChatHeader = ({ activeChat }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { closeChat } = useUiStore((state) => ({
    closeChat: state.closeChat,
  }))

  const handleBack = () => {
    closeChat()
    router.push('/chat')
  }

  return (
    <>
      <div className='p-2 w-full h-14 bg-white shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <ActionIcon className='md:hidden' onClick={handleBack}>
            <IoArrowBack color='#707579' />
          </ActionIcon>
          <div className='flex gap-2 items-center'>
            <img src={activeChat.avatar ? activeChat.avatar : '/user.svg'} className='w-8 h-8' />
            <div className='font-medium text-lg'>{activeChat.username}</div>
          </div>
        </div>
        <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
          <Menu.Target>
            <ActionIcon>
              <HiOutlineDotsVertical size='24' color='#707579' />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown className='right-4'>
            <Menu.Item>Test</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  )
}

export default ChatHeader
