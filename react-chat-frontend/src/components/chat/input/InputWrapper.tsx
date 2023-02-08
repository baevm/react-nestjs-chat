import { useSendMessageMutation } from '@redux/api/chat/chatSlice'
import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { setReplyMessage } from '@redux/slices/chatSlice'
import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { BsReply } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import EmojiButton from './EmojiButton'

const InputWrapper = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('common')
  const [newMessage, setNewMessage] = useState('')
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation()
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const replyMessage = useAppSelector((state) => state.chat.replyMessage)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()

    const contact = activeChat!.type === 'contact' ? getContact(activeChat!.participants, user?.id) : activeChat
    const message = {
      userId: user?.id,
      receiverId: contact.id,
      text: newMessage,
      chatId: activeChat?.chatId,
      parentMessageId: replyMessage?.id,
      reply_to: {
        id: replyMessage?.id,
        text: replyMessage?.text,
        user: {
          username: replyMessage?.username,
          avatar: replyMessage?.avatar,
        },
      },
    }
    sendMessage(message)

    setNewMessage('')
    clearReply()

    const bottom = document.getElementById('bottom')
    bottom?.scrollIntoView({})
  }

  const clearReply = () => {
    dispatch(setReplyMessage(null))
  }

  return (
    <div
      id='chat-input'
      className='absolute bottom-4 z-50 flex h-auto w-full min-w-[300px] items-end gap-2 px-8 md:w-1/2 md:px-0'>
      <div className='bg-input-color flex min-h-[3rem] w-full flex-col items-center rounded-xl'>
        {replyMessage ? (
          <div id='input-reply-message' className='flex h-12 w-full items-center justify-between pl-2'>
            <div className='flex w-full items-center gap-2'>
              <BsReply />
              <div className='border-active-item-color my-2 border-l-2 px-2'>
                <div className='text-active-item-color font-semibold'>{replyMessage.username}</div>
                <div className='text-text-color text-sm'>{replyMessage.text}</div>
              </div>
            </div>
            <div>
              <ActionIcon onClick={clearReply}>
                <IoClose />
              </ActionIcon>
            </div>
          </div>
        ) : (
          ''
        )}

        <div className='flex h-12 w-full items-center justify-center'>
          <EmojiButton setNewMessage={setNewMessage} />
          <form onSubmit={handleSend} className='h-full w-full'>
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              className='bg-input-color text-text-color h-full w-full outline-none'
              placeholder={t('message')!}
              autoFocus
            />
          </form>
          <ActionIcon>
            <AiOutlinePaperClip color='#707579' />
          </ActionIcon>
        </div>
      </div>
      <button className='bg-background-color hover:bg-active-item-color rounded-full p-3'>
        <BiMicrophone />
      </button>
    </div>
  )
}

export default InputWrapper
