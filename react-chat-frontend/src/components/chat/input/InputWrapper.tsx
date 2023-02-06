import { useAppSelector } from '@redux/hooks'
import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import React, { useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { useGetUserQuery, useSendMessageMutation } from 'redux/api/user/userSlice'
import EmojiButton from './EmojiButton'

const InputWrapper = () => {
  const [newMessage, setNewMessage] = useState('')
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation()
  const activeChat = useAppSelector((state) => state.ui.openedChat)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()

    const contact = activeChat!.type === 'contact' ? getContact(activeChat!.participants, user?.id) : activeChat
    const message = {
      userId: user?.id,
      receiverId: contact.id,
      text: newMessage,
      chatId: activeChat!.chatId,
    }
    sendMessage(message)
    setNewMessage('')
  }

  return (
    <div
      id='chat-input'
      className='absolute bottom-4 z-50 flex h-12 w-full min-w-[300px] items-end gap-2 px-8 md:w-1/2 md:px-0'>
      <div className='bg-input-color flex h-full w-full items-center rounded-xl'>
        <EmojiButton setNewMessage={setNewMessage} />
        <form onSubmit={handleSend} className='w-full'>
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className='bg-input-color text-text-color h-full w-full outline-none'
            placeholder='Message'
            autoFocus
          />
        </form>
        <ActionIcon>
          <AiOutlinePaperClip color='#707579' />
        </ActionIcon>
      </div>
      <button className='bg-background-color hover:bg-active-item-color rounded-full p-3'>
        <BiMicrophone />
      </button>
    </div>
  )
}

export default InputWrapper
