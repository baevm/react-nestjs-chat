import formatDate from '@utils/formatDate'
import formatTime from '@utils/formatTime'
import { useEffect, useMemo } from 'react'
import { useGetUserQuery } from 'redux/api/user/userSlice'
import GroupDate from './GroupDate'
import MessageItem from './MessageItem'

const MessagesContainer = ({ activeChat }: any) => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const messages = activeChat?.messages

  //group messages by date
  const messageDateGroups = useMemo(() => {
    let result: any = {}
    messages?.forEach((message: any) => {
      const date = formatDate(message.createdAt)
      if (result[date]) {
        result[date].push(message)
      } else {
        result[date] = [message]
      }
    })
    return result
  }, [messages])

  function getMessageUser(participants: any[], userId: string) {
    const contact = participants.find(({ user }) => user.id === userId)
    return contact.user
  }


  // first map by groups
  // then map messages of that group
  return (
    <div id='chat-list' className='w-full md:w-1/2 flex flex-col flex-1 gap-4'>
      {Object.keys(messageDateGroups).map((group: any, index: number) => (
        <div key={group} className='w-full flex-col flex'>
          <GroupDate date={group} />
          {messageDateGroups[group].map((message: any, index: number) => (
            <MessageItem
              key={message.id}
              isOwn={message.userId === user.id}
              createdAt={formatTime(message.createdAt)}
              text={message.text}
              username={
                activeChat.type === 'group' ? getMessageUser(activeChat.participants, message.userId).username : ''
              }
              avatar={activeChat.type === 'group' ? getMessageUser(activeChat.participants, message.userId).avatar : ''}
            />
          ))}
        </div>
      ))}
      <div id='bottom'></div>
    </div>
  )
}

export default MessagesContainer
