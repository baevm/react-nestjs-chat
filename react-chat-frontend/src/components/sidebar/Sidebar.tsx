import { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetUserQuery } from 'redux/api/userSlice'
import ContactItem from './ContactItem'
import FloatingButton from './floatingButton/FloatingButton'
import SidebarHeader from './header/SidebarHeader'
import ResizeHandle from './ResizeHandle'

const Sidebar = () => {
  const {data: user, isLoading, isError, error} = useGetUserQuery()
  const [activeFolder, setActiveFolder] = useState('All')
  const [clickedItem, setClickedItem] = useState<string | null>('')

  console.log({ user })

  return (
    <Panel
      className={`h-full w-full border-r-[1px] flex flex-col border-border-color bg-background-color relative`}
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={e => e.preventDefault()}>
        {user?.contacts.map(chat => (
          <ContactItem
            key={chat.id}
            id={chat.id}
            avatar={chat.avatar}
            title={chat.title}
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
