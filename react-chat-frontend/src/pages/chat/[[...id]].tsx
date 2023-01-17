import Chat from '@components/chat/Chat'
import Sidebar from '@components/sidebar/Sidebar'
import { SocketProvider } from '@services/socket'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

const ChatPage = () => {
  return (
    <SocketProvider>
      <div className='w-screen h-screen flex' style={{ flex: '1 1 auto' }}>
        <PanelGroup direction='horizontal' autoSaveId='persistence'>
          <Sidebar />
          <Chat />
        </PanelGroup>
      </div>
      <div id='portals' />
    </SocketProvider>
  )
}

export default ChatPage
