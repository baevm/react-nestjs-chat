import formatTime from '@utils/formatTime'
import React from 'react'

type Props = {
  text: string
  createdAt: string
  isOwn: boolean
}

const MessageItem = ({ text, createdAt, isOwn }: Props) => {
  return (
    <div
      className={`rounded-xl flex justify-end flex-col p-2 my-[4px] shadow-md message relative text-text-color ${
        isOwn ? 'bg-chat-message-own-color self-end own' : 'bg-chat-message-color self-start other'
      }`}>
      <div>{text}</div>
      <div
        className={`text-xs self-end z-50 ${
          isOwn ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
        }`}>
        {createdAt}
      </div>
    </div>
  )
}

export default MessageItem
