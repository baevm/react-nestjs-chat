import formatDate from '@utils/formatDate'
import formatTime from '@utils/formatTime'
import { useMemo } from 'react'
import { useGetUserQuery } from 'redux/api/user/userSlice'
import GroupDate from './GroupDate'
import MessageItem from './MessageItem'

const MessagesContainer = ({ messages }: any) => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()

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
            />
          ))}
        </div>
      ))}
      <div id='bottom'></div>
    </div>
  )
}

export default MessagesContainer
