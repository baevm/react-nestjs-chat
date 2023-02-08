import React from 'react'
import { Badge } from 'ui-kit'
import { Avatar } from 'ui-kit/Avatar'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  avatar: string | null
  title: string
  lastMessageTime?: string
  subtitle?: string
  unreadCount?: number
  isActive?: boolean
}

const ContactItem = ({ avatar, title, lastMessageTime, subtitle, unreadCount, isActive, ...props }: Props) => {
  return (
    <button
      {...props}
      id='chat-item'
      className={`flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 ${
        isActive ? 'bg-active-item-color text-white' : 'hover:bg-chat-hover-color'
      }`}>
      <Avatar src={avatar} size='lg' alt={`${title} avatar`} />
      <div className='flex-1'>
        <div className='flex justify-between'>
          <div className={`font-medium ${isActive ? 'text-white' : 'text-text-color'}`}>{title}</div>
          <div className={`text-xs  ${isActive ? 'text-white' : 'text-text-secondary-color'}`}>{lastMessageTime}</div>
        </div>
        <div className='flex justify-between'>
          <div className={`text-left ${isActive ? 'text-white' : 'text-text-secondary-color'}`}>{subtitle}</div>
          {unreadCount && unreadCount > 0 ? <Badge>{unreadCount}</Badge> : null}
        </div>
      </div>
    </button>
  )
}

export default ContactItem
