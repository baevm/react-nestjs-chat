import Chat from '@components/chat/Chat'
import Sidebar from '@components/sidebar/Sidebar'
import { SocketProvider } from '@services/socket'

const ChatPage = () => {
  return (
    <SocketProvider>
      <div className='w-screen h-screen flex'>
        <Sidebar />
        <Chat />
      </div>
    </SocketProvider>
  )
}

export default ChatPage
