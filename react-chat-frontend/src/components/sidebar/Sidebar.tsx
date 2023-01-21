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

  console.log({ chats })

  return (
    <Panel
      className={`h-full w-full border-r-[1px] flex flex-col border-border-color bg-background-color relative`}
      order={1}
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={(e) => e.preventDefault()}>
        {chats?.map((chat: any) => (
          <ContactItem
            key={chat.id}
            id={chat.id}
            title={chat.type === 'contact' ? getContact(chat.participants, user?.id).username : chat.title}
            avatar={chat.type === 'contact' ? getContact(chat.participants, user?.id).avatar : null}
            lastMessage={getLastMessage(chat.messages)}
            lastMessageTime={getLastMessageTime(chat.messages)}
            setClickedItem={setClickedItem}
            clickedItem={clickedItem}
          />
        ))}
      </div>
      <FloatingButton />
      <ResizeHandle />
    </Panel>
  )
}

export default Sidebar
