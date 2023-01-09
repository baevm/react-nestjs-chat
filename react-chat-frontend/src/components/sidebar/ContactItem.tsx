import Badge from '@components/common/Badge'
import useMessages from '@hooks/useMessages'
import useUiStore from '@store/uiStore'
import formatLastMsgTime from '@utils/formatLastMsgTime'
import formatTime from '@utils/formatTime'
import { useRouter } from 'next/router'
import React from 'react'

const ContactItem = ({ chat }: any) => {
  const router = useRouter()
  const activeChat = router.query.username ? router.query.username[0] : null
  const { messages, isLoading } = useMessages(chat.username)
  const { openChat } = useUiStore((state) => ({
    openChat: state.openChat,
  }))

  const handleOpenChat = (chatId: string) => {
    openChat()
    router.push(`/chat/${chatId}`, undefined, { shallow: true })
  }

  function getLastMessage(messages: any) {
    if (messages?.length > 0) {
      return messages[messages.length - 1].text
    }
    return ''
  }

  function getLastMessageTime(messages: any) {
    if (messages?.length > 0) {
      let time = messages[messages.length - 1].createdAt
      return formatLastMsgTime(time)
    }
    return ''
  }

  return (
    <button
      key={chat.id}
      onClick={() => handleOpenChat(chat.username)}
      id='chat-item'
      className={`w-full p-2 rounded-lg cursor-pointer  flex gap-2 ${
        chat.username === activeChat ? 'bg-active-item-color text-white' : 'bg-white hover:bg-[#f4f4f5]'
      }`}>
      <img src={chat.avatar ? chat.avatar : '/user.svg'} className='w-12 h-12' alt={'test'} />
      <div className='w-full'>
        <div className='flex justify-between'>
          <div className='font-medium'>{chat.username}</div>
          <div className={`text-xs  ${chat.username === activeChat ? 'text-white' : 'text-gray-500'}`}>
            {getLastMessageTime(messages)}
          </div>
        </div>
        <div className='flex justify-between'>
          <div className={`text-left ${chat.username === activeChat ? 'text-white' : 'text-gray-500'}`}>{getLastMessage(messages)}</div>
          {chat.unreadCount > 0 ? <Badge>{chat.unreadCount}</Badge> : null}
        </div>
      </div>
    </button>
  )
}

export default ContactItem
