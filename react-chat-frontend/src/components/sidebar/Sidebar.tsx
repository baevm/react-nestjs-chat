import useUser from '@hooks/useUser'
import useUiStore from '@store/uiStore'
import ContactItem from './ContactItem'
import SidebarHeader from './header/SidebarHeader'
import FloatingButton from './floatingButton/FloatingButton'

const Sidebar = () => {
  const { user, error, isError, isLoading } = useUser()

  const chats = user?.contacts

  const { isChatOpen } = useUiStore((state) => ({
    isChatOpen: state.isChatOpen,
  }))

  return (
    <div
      className={`h-full w-full md:w-1/4 md:min-w-[465px] border-r-[1px] border-gray-300 bg-white relative ${
        isChatOpen ? '' : 'absolute md:relative'
      }`}>
      <SidebarHeader />

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
