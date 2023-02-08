import { useAppSelector } from '@redux/hooks'
import formatDate from '@utils/formatDate'
import { useMemo } from 'react'
import { useGetUserQuery } from 'redux/api/user/userSlice'
import { Message } from 'types/app.types'
import GroupDate from './GroupDate'
import MessageItem from './message/MessageItem'

type GroupResult = {
  [key: string]: Message[]
}

const MessagesContainer = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const messages = activeChat?.messages
  const chatType = activeChat?.type

  //group messages by date
  const messageDateGroups = useMemo(() => {
    let result: GroupResult = {}
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
    <div id='chat-list' className='relative flex w-full flex-1 flex-col gap-4 md:w-1/2'>
      {Object.keys(messageDateGroups).map((group) => (
        <div key={group} className='flex w-full flex-col'>
          <GroupDate date={group} />
          {messageDateGroups[group].map((message) => (
            <MessageItem
              key={message.id}
              id={message.id}
              isOwn={message.userId === user?.id}
              isGroup={chatType === 'group'}
              text={message.text}
              createdAt={message.createdAt}
              username={getMessageUser(activeChat!.participants, message.userId).username}
              avatar={getMessageUser(activeChat!.participants, message.userId).avatar ?? '/images/user.png'}
              replyTo={message.reply_to}
            />
          ))}
        </div>
      ))}

      <div id='bottom' className='scroll-mt-24'></div>
    </div>
  )
}

export default MessagesContainer
