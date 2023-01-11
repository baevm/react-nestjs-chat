import useMessages from '@hooks/useMessages'
import useUser from '@hooks/useUser'
import { SocketContext } from '@services/socket'
import formatTime from '@utils/formatTime'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

const ChatList = () => {
  const router = useRouter()
  const socket = useContext(SocketContext)
  const activeChat = router.query.username ? router.query.username[0] : null

  const { user, error, isError, isLoading } = useUser()
  const { messages, addNewMessage } = useMessages(activeChat)

  useEffect(() => {
    socket.on('chatToClient', msg => {
      console.log({ msg })
      addNewMessage(msg, user)
    })
  }, [])

  console.log({ messages })

  return (
    <>
      <div id='chat-list' className='w-full md:w-1/2 flex flex-col flex-1 gap-4'>
        {messages?.map((message: any) => (
          <div
            key={message.id}
            className={`rounded-xl flex justify-end flex-col p-2 shadow-md message relative text-text-color
            ${
              message.senderId === user.id
                ? 'bg-chat-message-own-color self-end own'
                : 'bg-chat-message-color self-start other'
            }`}>
            <div>{message.text}</div>
            <div
              className={`text-xs self-end z-50 ${
                message.senderId === user.id ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
              }`}>
              {formatTime(message.createdAt)}
            </div>
          </div>
        ))}
        <div id='bottom'></div>
      </div>
      <style>
        {`
        <style>
        .message::before,
        .message::after {
          bottom: -0.1rem;
          content: '';
          height: 1rem;
          position: absolute;
        }
        
        .own::before {
          border-bottom-left-radius: 0.9rem 0.1rem;
          border-top-right-radius: 2rem;
          border-right: 1rem solid #eeffde;
          right: -0.3rem;
          transform: translate(0, -0.1rem);
        }
        
        .own::after {
          background-color: #8fbc88;
          border-bottom-left-radius: 0.5rem;
          right: -40px;
          transform: translate(-30px, -2px);
          width: 10px;
        }
        
        .other::before {
          border-bottom-right-radius: 0.9rem 0.1rem;
          border-top-left-radius: 2rem;
          border-left: 1rem solid #fff;
          left: -0.3rem;
          transform: translate(0, -0.1rem);
        }
        
        .other::after {
          background-color: #8fbc88;
          border-bottom-right-radius: 0.5rem;
          left: 20px;
          transform: translate(-30px, -2px);
          width: 10px;
        }
        </style>`}
      </style>
    </>
  )
}

export default ChatList
