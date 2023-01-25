import { Badge } from '@ui-kit'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAppDispatch } from 'redux/hooks'
import { openChat } from 'redux/slices/uiSlice'
import ContextMenu from './ContextMenu'

type Props = {
  id: string
  title: string
  avatar: string | null
  unreadCount?: number
  lastMessageTime: string
  lastMessage: string
  setClickedItem: (id: string | null) => void
  clickedItem: string | null
}

const ContactItem = ({
  id,
  title,
  avatar,
  unreadCount,
  lastMessage,
  lastMessageTime,
  setClickedItem,
  clickedItem,
}: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const openedChatId = router.query.id ? router.query.id[0] : null
  const [posXY, setPosXY] = useState({ x: 0, y: 0 })

  const handleOpenChat = (id: string) => {
    dispatch(openChat())
    router.push(`/chat/${id}`, undefined, { shallow: true })
  }

  function handleOpenContext(e: any) {
    e.preventDefault()

    setClickedItem(id)
    setPosXY({ x: e.clientX, y: e.clientY })
  }

  function handleCloseContext() {
    setClickedItem(null)
    setPosXY({ x: 0, y: 0 })
  }

  return (
    <>
      <button
        onClick={() => handleOpenChat(id)}
        onContextMenu={handleOpenContext}
        id='chat-item'
        className={`w-full p-2 rounded-lg cursor-pointer  flex gap-2 ${
          id === openedChatId ? 'bg-active-item-color text-white' : 'hover:bg-chat-hover-color'
        }`}>
        <img src={avatar ? avatar : '/user.png'} className='w-12 h-12 rounded-full' alt={`${title} avatar`} />
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className={`font-medium ${id === openedChatId ? 'text-white' : 'text-text-color'}`}>{title}</div>
            <div className={`text-xs  ${id === openedChatId ? 'text-white' : 'text-text-secondary-color'}`}>
              {lastMessageTime}
            </div>
          </div>
          <div className='flex justify-between'>
            <div className={`text-left ${id === openedChatId ? 'text-white' : 'text-text-secondary-color'}`}>
              {lastMessage}
            </div>
            {unreadCount && unreadCount > 0 ? <Badge>{unreadCount}</Badge> : null}
          </div>
        </div>
      </button>
      {clickedItem === id && <ContextMenu xPos={posXY.x} yPos={posXY.y} handleCloseContext={handleCloseContext} />}
    </>
  )
}

export default ContactItem
