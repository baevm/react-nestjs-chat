import ActionIcon from '@components/common/ActionIcon'
import useUser from '@hooks/useUser'
import { SocketContext } from '@services/socket'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { MdOutlineInsertEmoticon } from 'react-icons/md'

const ChatInput = ({ activeChat }: any) => {
  const [newMessage, setNewMessage] = useState('')
  const { user, error, isError, isLoading } = useUser()
  const socket = useContext(SocketContext)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    socket.emit('chatToServer', {
      senderId: user.id,
      senderName: user.username,
      receiverId: activeChat.id,
      receiverName: activeChat.username,
      text: newMessage,
    })
    setNewMessage('')
  }

  return (
    <div
      id='chat-input'
      className='px-8 w-full md:w-1/2 md:px-0 min-w-[300px] h-12 flex items-end gap-2 absolute bottom-4 z-50'>
      <div className='w-full h-full flex items-center bg-white rounded-xl'>
        <ActionIcon>
          <MdOutlineInsertEmoticon color='#707579' />
        </ActionIcon>
        <form onSubmit={handleSend} className='w-full'>
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className='h-full w-full outline-none'
            placeholder='Message'
          />
        </form>
        <ActionIcon>
          <AiOutlinePaperClip color='#707579' />
        </ActionIcon>
      </div>
      <button className='bg-white rounded-full p-3 text-[#707579] hover:bg-blue-500 hover:text-white'>
        <BiMicrophone />
      </button>
    </div>
  )
}

export default ChatInput
