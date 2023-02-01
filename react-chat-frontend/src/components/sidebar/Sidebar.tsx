import formatLastMsgTime from '@utils/formatLastMsgTime'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetChatsQuery, useGetUserQuery } from 'redux/api/user/userSlice'
import { ChatType, Message } from 'types/app.types'
import ClickableContact from './ClickableContact'
import FloatingButton from './floatingButton/FloatingButton'
import SidebarHeader from './header/SidebarHeader'
import ResizeHandle from './ResizeHandle'

const Sidebar = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const { data: chats, isLoading: chatsLoading } = useGetChatsQuery()
  const [activeFolder, setActiveFolder] = useState('All')
  const [contextMenuId, setContextMenuId] = useState<string | null>('')

  function getLastMessage(messages: Message[], type: ChatType, participants: any) {
    if (messages.length < 1) {
      return ''
    }

    const messageText = messages[messages.length - 1].text
    const senderId = messages[messages.length - 1].userId

    if (type === 'group') {
      const senderName = participants.find(({ user }: any) => user.id === senderId).user.username
      return senderName + ': ' + messageText
    } else {
      return (user?.id === senderId ? 'You: ' : '') + messageText
    }
  }

  function getLastMessageTime(messages: any) {
    if (messages?.length > 0) {
      let time = messages[messages.length - 1].createdAt
      return formatLastMsgTime(time)
    }
    return ''
  }

  if (isLoading) return null

  return (
    <Panel
      className={`h-full w-full border-r-[1px] flex flex-col border-border-color bg-background-color relative`}
      order={1}
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={(e) => e.preventDefault()}>
        {chats?.map((item) => (
          <ClickableContact
            key={item.id}
            id={item.chatId}
            title={item.type === 'contact' ? getContact(item.participants, user.id).username : item.title}
            avatar={item.type === 'contact' ? getContact(item.participants, user.id).avatar : null}
            lastMessage={getLastMessage(item.messages, item.type, item.participants)}
            lastMessageTime={getLastMessageTime(item.messages)}
            setContextMenuId={setContextMenuId}
            contextMenuId={contextMenuId}
            unreadCount={item?.unreadCount}
          />
        ))}
      </div>
      <FloatingButton />
      <ResizeHandle />
    </Panel>
  )
}

export default Sidebar
