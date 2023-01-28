import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import React, { useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { useGetUserQuery, useSendMessageMutation } from 'redux/api/user/userSlice'
import EmojiButton from './EmojiButton'

const InputWrapper = ({ activeChat }: any) => {
  const [newMessage, setNewMessage] = useState('')
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation()

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()

    const contact = activeChat.type === 'contact' ? getContact(activeChat.participants, user?.id) : activeChat
    const message = {
      userId: user?.id,
      receiverId: contact.id,
      text: newMessage,
      chatId: activeChat.chatId,
    }
    sendMessage(message)
    setNewMessage('')
  }

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

export default InputWrapper
