import { useRouter } from 'next/router'
import useUser from '@hooks/useUser'
import useUiStore from '@store/uiStore'
import NewContactButton from './NewContactButton'
import SidebarHeader from './header/SidebarHeader'
import Badge from '@components/common/Badge'

const Sidebar = () => {
  const router = useRouter()
  const { user, error, isError, isLoading } = useUser()
  const activeChat = router.query.username ? router.query.username[0] : null
  const chats = user?.contacts

  const { openChat, isChatOpen } = useUiStore((state) => ({
    isChatOpen: state.isChatOpen,
    openChat: state.openChat,
  }))

  const handleOpenChat = (chatId: string) => {
    openChat()
    router.push(`/chat/${chatId}`, undefined, { shallow: true })
  }

  return (
    <div
      className={`h-full w-full md:w-1/4 md:min-w-[465px] border-r-[1px] border-gray-300 bg-white relative ${
        isChatOpen ? '' : 'absolute md:relative'
      }`}>
      <SidebarHeader />

      <div id='sidebar-chats' className='p-2 overflow-y-auto'>
        {chats?.map((chat: any) => (
          <button
            key={chat.id}
            onClick={() => handleOpenChat(chat.username)}
            id='chat-item'
            className={`w-full p-2 rounded-lg cursor-pointer  flex gap-2 ${
              chat.username === activeChat ? 'bg-active-item-color text-white' : 'bg-white hover:bg-[#f4f4f5]'
            }`}>
            <img src={chat.avatar ? chat.avatar : '/user.svg'} className='w-12 h-12' alt={'test'} />
            <div className='w-full'>
              <div className='flex justify-between'>
                <div className='font-medium'>{chat.username}</div>
                <div className='text-xs text-gray-500'>{chat.lastMessageTime}</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-gray-500 text-left'>{chat.lastMessage}</div>
                {chat.unreadCount > 0 ? <Badge>{chat.unreadCount}</Badge> : null}
              </div>
            </div>
          </button>
        ))}

        <NewContactButton />
      </div>
    </div>
  )
}

export default Sidebar
