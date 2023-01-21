import formatLastMsgTime from '@utils/formatLastMsgTime'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetUserQuery } from 'redux/api/user/userSlice'
import ContactItem from './ContactItem'
import FloatingButton from './floatingButton/FloatingButton'
import SidebarHeader from './header/SidebarHeader'
import ResizeHandle from './ResizeHandle'

const Sidebar = () => {
  const { data: currUser, isLoading, isError, error } = useGetUserQuery()
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
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={(e) => e.preventDefault()}>
        {currUser?.chats.map((chat) => (
          <ContactItem
            key={chat.id}
            id={chat.id}
            title={chat.type === 'contact' ? getContact(chat.participants, currUser.id).username : chat.title}
            avatar={chat.type === 'contact' ? getContact(chat.participants, currUser.id).avatar : null}
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
