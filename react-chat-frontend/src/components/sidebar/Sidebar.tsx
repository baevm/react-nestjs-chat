import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Folder } from '../../types/app.types'
import ActionIcon from '../common/ActionIcon'
import Badge from '../common/Badge'
import NewContactButton from './NewContactButton'
import SearchInput from './SearchInput'
import { MdOutlineMenu } from 'react-icons/md'
import useUiStore from '../../store/uiStore'
import useUser from '../../hooks/useUser'


const folders = [
  { title: 'All', count: 10 },
  { title: 'Unread', count: 6 },
  { title: 'Trash', count: 0 },
]

const Sidebar = () => {
  const router = useRouter()
  const [activeFolder, setActiveFolder] = useState('')
  const { user, error, isError, isLoading } = useUser()

  const chats = user?.contacts

  
  const { openChat, isChatOpen } = useUiStore((state) => ({
    isChatOpen: state.isChatOpen,
    openChat: state.openChat,
  }))

  const handleOpenChat = (chatId: number) => {
    openChat()
    router.push(`/chat/${chatId}`)
  }

  return (
    <div
      className={`h-full w-full md:w-1/4 md:min-w-[465px] border-r-[1px] border-gray-300 bg-white relative ${
        isChatOpen ? '' : 'absolute md:relative'
      }`}>
      <div
        id='sidebar-header'
        className='h-24 border-b-[1px] border-gray-300 shadow-sm pt-2 px-4 flex flex-col justify-between'>
        <div className='flex items-center gap-4'>
          <ActionIcon>
            <MdOutlineMenu color='#707579' />
          </ActionIcon>
          <SearchInput />
        </div>

        <div id='sidebar-folders' className='flex gap-4'>
          {folders.map((folder) => (
            <div
              key={folder.title}
              className={`border-blue-500 min-w-[3rem] flex gap-2 cursor-pointer font-medium ${
                activeFolder === folder.title ? 'border-b-2 text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => {
                setActiveFolder(folder.title)
              }}>
              {folder.title}
              <Badge>{folder.count}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div id='sidebar-chats' className='p-2 overflow-y-auto'>
        {chats?.map((chat: any) => (
          <button
            key={chat.id}
            onClick={() => handleOpenChat(chat.id)}
            id='chat-item'
            className='w-full p-2 rounded-lg cursor-pointer hover:bg-[#f4f4f5] flex gap-2'>
            <img src={chat.avatar ? chat.avatar : '/user.svg'} className='w-12 h-12' alt={'test'} />
            <div className='w-full'>
              <div className='flex justify-between'>
                <div className='font-medium'>{chat.username}</div>
                <div className='text-xs text-gray-500'>{chat.lastMessageTime}</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-gray-500 text-left'>{chat.lastMessage}</div>
                <Badge v-if='chat.unreadCount > 0'>{chat.unreadCount}</Badge>
              </div>
            </div>
          </button>
        ))}

        <NewContactButton />
      </div>
    </div>
  )
}

export default Sidebar
