import formatLastMsgTime from '@utils/formatLastMsgTime'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetChatsQuery, useGetUserQuery } from 'redux/api/user/userSlice'
import ContactItem from './ContactItem'
import FloatingButton from './floatingButton/FloatingButton'
import SidebarHeader from './header/SidebarHeader'
import ResizeHandle from './ResizeHandle'

const Sidebar = () => {
  const { data: user, isLoading, isError, error } = useGetUserQuery()
  const { data: chats, isLoading: chatsLoading } = useGetChatsQuery()
  const [activeFolder, setActiveFolder] = useState('All')
  const [clickedItem, setClickedItem] = useState<string | null>('')

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
    <Panel
      className={`h-full w-full border-r-[1px] flex flex-col border-border-color bg-background-color relative`}
      order={1}
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={(e) => e.preventDefault()}>
        {chats?.map((item: any) => (
          <ContactItem
            key={item.id}
            id={item.chatId}
            title={
              item.type === 'contact' ? getContact(item.participants, user?.id).username : item.title
            }
            avatar={item.type === 'contact' ? getContact(item.participants, user?.id).avatar : null}
            lastMessage={getLastMessage(item.messages)}
            lastMessageTime={getLastMessageTime(item.messages)}
            setClickedItem={setClickedItem}
            clickedItem={clickedItem}
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
