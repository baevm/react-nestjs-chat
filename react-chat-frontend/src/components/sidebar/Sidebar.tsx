import useUser from '@hooks/useUser'
import useUiStore from '@store/uiStore'
import ContactItem from './ContactItem'
import SidebarHeader from './header/SidebarHeader'
import FloatingButton from './floatingButton/FloatingButton'
import { useState } from 'react'

const Sidebar = () => {
  const { user, error, isError, isLoading } = useUser()
  const [activeFolder, setActiveFolder] = useState('All')

  const chats = activeFolder === 'All' ? user.contacts : user.folders.find(folder => folder.name === activeFolder)?.contacts

  const { isChatOpen } = useUiStore(state => ({
    isChatOpen: state.isChatOpen,
  }))

  return (
    <div
      className={`h-full w-full md:w-1/4 md:min-w-[465px] border-r-[1px] border-border-color bg-background-color relative ${
        isChatOpen ? '' : 'absolute md:relative'
      }`}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto'>
        {chats?.map((chat: any) => (
          <ContactItem key={chat.id} chat={chat} />
        ))}

        <FloatingButton />
      </div>
    </div>
  )
}

export default Sidebar
