import Chat from '@components/chat/Chat'
import Sidebar from '@components/sidebar/Sidebar'
import { SocketProvider } from '@services/socket'
import { PanelGroup } from 'react-resizable-panels'

const ChatPage = () => {
  return (
    <SocketProvider>
      <div className='w-screen h-screen flex' id='chat-container'>
        <PanelGroup direction='horizontal' autoSaveId='persistence' className='flex w-full h-full'>
          <Sidebar />
          <Chat />
        </PanelGroup>
      </div>
      <div id='portals' />
    </SocketProvider>
  )
}

export default ChatPage
