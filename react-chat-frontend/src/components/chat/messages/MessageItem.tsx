type Props = {
  username?: string
  avatar?: string
  text: string
  createdAt: string
  isOwn: boolean
}

const MessageItem = ({ text, createdAt, isOwn, username, avatar }: Props) => {
  return (
    <div className={`flex relative ${isOwn ? 'self-end' : 'self-start'}`}>
      {!isOwn && avatar ? (
        <div className='self-end mr-2 mb-[2px] z-50'>
          <img src={avatar} className='w-8 h-8 rounded-full' />
        </div>
      ) : (
        ''
      )}
      <div
        className={`rounded-xl flex justify-end flex-col p-2 my-[4px] shadow-md message relative text-text-color ${
          isOwn ? 'bg-chat-message-own-color own' : 'bg-chat-message-color other'
        }`}>
        {!isOwn ? <div className='font-medium text-active-item-color'>{username}</div> : ''}
        <div>{text}</div>
        <div
          className={`text-xs self-end z-50 ${
            isOwn ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
          }`}>
          {createdAt}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
