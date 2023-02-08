import Chat from '@components/chat/Chat'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import { PanelGroup } from 'react-resizable-panels'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// dynamic import to prevent flickering to half of screen on page load
const Sidebar = dynamic(() => import('@components/sidebar/Sidebar'), { ssr: false })

const ChatPage = () => {
  return (
    <div className='flex h-screen w-screen' id='chat-container'>
      <PanelGroup direction='horizontal' autoSaveId='persistence' className='flex h-full w-full'>
        <Sidebar />
        <Chat />
      </PanelGroup>
    </div>
  )
}

export default ChatPage

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['sidebar', 'common'])),
  },
})
