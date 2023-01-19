import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetUserQuery } from 'redux/api/userSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { closeChat, openChat } from 'redux/slices/uiSlice'
import ChatHeader from './header/ChatHeader'
import ChatInput from './input/ChatInput'
import MessagesContainer from './messages/MessagesContainer'

const Chat = () => {
  const router = useRouter()
  const {data: user, isLoading, isError, error} = useGetUserQuery()
  const openedChatQuery = router.query.id ? router.query.id[0] : null
  const isChatOpen = useAppSelector(state => state.ui.isChatOpen)
  const dispatch = useAppDispatch()

  const activeChat = user?.contacts.find(chat => chat.id === openedChatQuery)

  useEffect(() => {
    if (!activeChat) return

    dispatch(openChat())

    return () => {
      dispatch(closeChat())
    }
  }, [activeChat])

  if (!activeChat) {
    return (
      <Panel
        className={`w-full h-full flex flex-col bg-chat-box-background-color ${
          isChatOpen ? 'absolute md:relative' : 'hidden md:block'
        }`}></Panel>
    )
  }

  return (
    <Panel
      className={`chat-container w-full h-full flex flex-col bg-chat-box-background-color ${
        isChatOpen ? 'absolute md:relative' : 'hidden'
      }`}>
      <ChatHeader
        avatar={activeChat.avatar}
        title={activeChat.title}
        type={activeChat._type}
        subtitle={activeChat._type === 'group' && activeChat.members ? `${activeChat.members} members` : ''}
      />
      <div
        id='chat-box'
        className='flex flex-col-reverse items-center w-full h-full py-4 px-4 md:px-0 overflow-y-auto max-h-[calc(100%-130px)] '>
        <MessagesContainer />
        <ChatInput activeChat={activeChat} />
      </div>
    </Panel>
  )
}

export default Chat
