import { useRouter } from 'next/router'
import React from 'react'
import Chat from '../../components/chat/Chat'
import Sidebar from '../../components/sidebar/Sidebar'
import useUser from '../../hooks/useUser'

const ChatPage = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Sidebar />
      <Chat />
    </div>
  )
}

export default ChatPage
