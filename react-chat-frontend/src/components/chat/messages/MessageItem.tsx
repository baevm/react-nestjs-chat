import formatTime from '@utils/formatTime'
import React from 'react'

const MessageItem = ({ message, userId }: any) => {
  return (
    <>
      <div
        className={`rounded-xl flex justify-end flex-col p-2 my-[4px] shadow-md message relative text-text-color ${
          message.senderId === userId
            ? 'bg-chat-message-own-color self-end own'
            : 'bg-chat-message-color self-start other'
        }`}>
        <div>{message.text}</div>
        <div
          className={`text-xs self-end z-50 ${
            message.senderId === userId ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
          }`}>
          {formatTime(message.createdAt)}
        </div>
      </div>
    </>
  )
}

export default MessageItem
