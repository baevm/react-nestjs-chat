import Chat from '@components/chat/Chat'
import dynamic from 'next/dynamic'
import { PanelGroup } from 'react-resizable-panels'

// dynamic import to prevent flickering to half of screen on page load
const Sidebar = dynamic(() => import('@components/sidebar/Sidebar'), { ssr: false })

const ChatPage = () => {
  return (
    <div className='w-screen h-screen flex' id='chat-container'>
      <PanelGroup direction='horizontal' autoSaveId='persistence' className='flex w-full h-full'>
        <Sidebar />
        <Chat />
      </PanelGroup>
    </div>
  )
}

export default ChatPage
