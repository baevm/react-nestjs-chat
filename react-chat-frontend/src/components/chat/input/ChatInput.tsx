import ActionIcon from '@components/ui-kit/ActionIcon'
import { SocketContext } from '@services/socket'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { useGetUserMessagesQuery, useGetUserQuery, userApi } from 'redux/api/userSlice'
import { useAppDispatch } from 'redux/hooks'
import EmojiButton from './EmojiButton'

const ChatInput = ({ activeChat }: any) => {
  const [newMessage, setNewMessage] = useState('')
  const dispatch = useAppDispatch()
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const socket = useContext(SocketContext)
  const {} = useGetUserMessagesQuery(activeChat.id)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    socket.emit('chatToServer', {
      senderId: user?.id,
      senderName: user?.username,
      receiverId: activeChat.id,
      receiverName: activeChat.username,
      text: newMessage,
    })
    setNewMessage('')
  }

  useEffect(() => {
    socket.on('chatToClient', (msg) => {
      console.log({ msg })

      let userToCache = msg.senderId === user?.id ? msg.receiverId : msg.senderId

      dispatch(
        userApi.util.updateQueryData('getUserMessages', userToCache, (data) => {
          return [...data, msg]
        })
      )
      /* cacheNewMessage(msg, user) */
    })
  }, [])

  return (
    <div
      id='chat-input'
      className='px-8 w-full md:w-1/2 md:px-0 min-w-[300px] h-12 flex items-end gap-2 absolute bottom-4 z-50'>
      <div className='w-full h-full flex items-center bg-input-color rounded-xl'>
        <EmojiButton setNewMessage={setNewMessage} />
        <form onSubmit={handleSend} className='w-full'>
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className='h-full w-full outline-none bg-input-color text-text-color'
            placeholder='Message'
            autoFocus
          />
        </form>
        <ActionIcon>
          <AiOutlinePaperClip color='#707579' />
        </ActionIcon>
      </div>
      <button className='bg-background-color rounded-full p-3  hover:bg-active-item-color'>
        <BiMicrophone />
      </button>
    </div>
  )
}

export default ChatInput
