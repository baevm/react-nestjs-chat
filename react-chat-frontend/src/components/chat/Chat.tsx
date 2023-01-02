import { useRouter } from 'next/router'
import { useState } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { BiMicrophone } from 'react-icons/bi'
import { MdOutlineInsertEmoticon } from 'react-icons/md'
import useUser from '../../hooks/useUser'
import useUiStore from '../../store/uiStore'
import ActionIcon from '../common/ActionIcon'
import ChatHeader from './ChatHeader'

const Chat = () => {
  const router = useRouter()

  const [newMessage, setNewMessage] = useState('')
  const { user, error, isError, isLoading } = useUser()

  const activeChat = user?.contacts.find((chat: any) => chat.username === router.query.username) || null


  const { isChatOpen } = useUiStore((state) => ({
    isChatOpen: state.isChatOpen,
  }))

  const handleSend = () => {
    /*  socket.emit('chatToServer', { sender: currentUser.username, room: 'testRoom', message: newMessage.value })
    newMessage.value = '' */
  }

  if (!activeChat) {
    return <div className='bg-green-100 w-full h-full'></div>
  }

  return (
    <>
      <div className={`w-full h-full flex flex-col bg-[#8FBC88] ${isChatOpen ? 'absolute md:relative' : 'hidden'}`}>
        <ChatHeader activeChat={activeChat} />
        <div
          id='chat-box'
          className='flex flex-col-reverse items-center w-full h-full py-4 px-4 md:px-0 overflow-y-auto max-h-[calc(100%-130px)]'>
          <div id='chat-list' className='w-full md:w-1/2 flex flex-col flex-1 gap-4'>
            {activeChat.messages.map((message: any) => (
              <div
                key={message.id}
                className={`rounded-xl flex justify-end flex-col p-2 shadow-md message relative
            ${message.senderId === user.id ? 'bg-[#EEFFDE] self-end own' : 'bg-white self-start other'}`}>
                <div>{message.text}</div>
                <div className='text-xs text-[#707579] self-end z-50'>{message.time}</div>
              </div>
            ))}
            <div id='bottom'></div>
          </div>

          <div
            id='chat-input'
            className='w-full md:w-1/2 min-w-[300px] h-12 flex items-end gap-2 absolute bottom-4 z-50'>
            <div className='w-full h-full flex items-center bg-white rounded-xl'>
              <ActionIcon>
                <MdOutlineInsertEmoticon color='#707579' />
              </ActionIcon>
              <form onSubmit={handleSend} className='w-full'>
                <input
                  onChange={(e) => setNewMessage(e.target.value)}
                  className='h-full w-full outline-none'
                  placeholder='Message'
                />
              </form>
              <ActionIcon>
                <AiOutlinePaperClip color='#707579' />
              </ActionIcon>
            </div>
            <button className='bg-white rounded-full p-3 text-[#707579] hover:bg-blue-500 hover:text-white'>
              <BiMicrophone />
            </button>
          </div>
        </div>
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

export default Chat
