import { getContact } from '@utils/getContact'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Panel } from 'react-resizable-panels'
import { useGetChatsQuery, useGetUserQuery } from 'redux/api/user/userSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { closeChat, openChat } from 'redux/slices/uiSlice'
import ChatHeader from './header/ChatHeader'
import InputWrapper from './input/InputWrapper'
import MessagesContainer from './messages/MessagesContainer'

const Chat = () => {
  const router = useRouter()
  const { data: user, isLoading } = useGetUserQuery()
  const { data: chats } = useGetChatsQuery()
  const openedChatId = router.query.id ? router.query.id[0] : null
  const isChatOpen = useAppSelector((state) => state.ui.isChatOpen)
  const dispatch = useAppDispatch()

  const activeChat = chats?.find((chat) => chat.chatId === openedChatId)

  useEffect(() => {
    if (!activeChat) return

    dispatch(openChat(activeChat.chatId))

    return () => {
      dispatch(closeChat())
    }
  }, [activeChat])

  if (!isChatOpen) {
    return (
      <Panel
        order={2}
        className={`w-full h-full flex flex-col bg-chat-box-background-color ${
          isChatOpen ? 'absolute md:relative' : 'hidden md:block'
        }`}></Panel>
    )
  }

  console.log({ activeChat })

  return (
    <Panel
      order={2}
      className={`chat-container w-full h-full flex flex-col bg-chat-box-background-color ${
        isChatOpen ? 'absolute md:relative' : 'hidden'
      }`}>
      <ChatHeader
        avatar={activeChat?.type === 'contact' ? getContact(activeChat.participants, user?.id).avatar : null}
        title={
          activeChat?.type === 'contact' ? getContact(activeChat.participants, user?.id).username : activeChat?.title
        }
        type={activeChat?.type}
        subtitle={activeChat?.type === 'group' ? `${activeChat.participants.length} members` : ''}
      />
      <div
        id='chat-box'
        className='flex flex-col-reverse items-center w-full h-full py-4 px-4 md:px-0 overflow-y-auto max-h-[calc(100%-130px)] '>
        <MessagesContainer activeChat={activeChat} />
        <InputWrapper activeChat={activeChat} />
      </div>
    </Panel>
  )
}

export default Chat
