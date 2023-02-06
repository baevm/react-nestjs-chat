import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetChatsQuery } from 'redux/api/user/userSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { closeChat, openChat } from 'redux/slices/uiSlice'
import ChatHeader from './header/ChatHeader'
import InputWrapper from './input/InputWrapper'
import MessagesContainer from './messageContainer/MessagesContainer'

const Chat = () => {
  const router = useRouter()
  const { data: chats } = useGetChatsQuery()
  const openedChatId = router.query.id ? router.query.id[0] : null
  const isChatOpen = useAppSelector((state) => state.ui.isChatOpen)
  const dispatch = useAppDispatch()

  const activeChat = chats?.find((chat) => chat.chatId === openedChatId)

  useEffect(() => {
    if (!activeChat) return

    dispatch(openChat(activeChat))

    return () => {
      dispatch(closeChat())
    }
  }, [activeChat])

  if (!isChatOpen) {
    return (
      <Panel
        order={2}
        className={`bg-chat-box-background-color flex h-full w-full flex-col ${
          isChatOpen ? 'absolute md:relative' : 'hidden md:block'
        }`}></Panel>
    )
  }

  return (
    <Panel
      order={2}
      className={`chat-container bg-chat-box-background-color flex h-full w-full flex-col ${
        isChatOpen ? 'absolute md:relative' : 'hidden'
      }`}>
      <ChatHeader />
      <div
        id='chat-box'
        className='flex h-full max-h-[calc(100%-130px)] w-full flex-col-reverse items-center overflow-y-auto py-4 px-4 md:px-0 '>
        <MessagesContainer />
        <InputWrapper />
      </div>
    </Panel>
  )
}

export default Chat
