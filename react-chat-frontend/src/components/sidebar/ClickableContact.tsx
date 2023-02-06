import ContactItem from '@components/common/ContactItem'
import { useUpdateUnreadCountMutation } from '@redux/api/user/userSlice'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ContextMenu from './ContextMenu'

type Props = {
  id: string
  title: string
  avatar: string | null
  unreadCount: number
  lastMessageTime: string
  lastMessage: string
}

const ClickableContact = ({ id, title, avatar, unreadCount, lastMessage, lastMessageTime }: Props) => {
  const router = useRouter()
  const openedChatId = router.query.id ? router.query.id[0] : null
  const [contextMenuId, setContextMenuId] = useState<string | null>('')
  const [posXY, setPosXY] = useState({ x: 0, y: 0 })
  const [handleUpdate, { isLoading }] = useUpdateUnreadCountMutation()

  const handleOpenChat = (id: string) => {
    router.push(`/chat/${id}`, undefined, { shallow: true })

    if (unreadCount > 0) {
      handleUpdate(id)
    }
  }

  function handleOpenContext(e: React.MouseEvent) {
    e.preventDefault()

    setContextMenuId(id)
    setPosXY({ x: e.clientX, y: e.clientY })
  }

  function handleCloseContext() {
    setContextMenuId(null)
    setPosXY({ x: 0, y: 0 })
  }

  return (
    <>
      <ContactItem
        avatar={avatar}
        title={title}
        lastMessageTime={lastMessageTime}
        isActive={id === openedChatId}
        subtitle={lastMessage}
        onContextMenu={handleOpenContext}
        onClick={() => handleOpenChat(id)}
        unreadCount={unreadCount}
      />
      {contextMenuId === id && <ContextMenu xPos={posXY.x} yPos={posXY.y} handleCloseContext={handleCloseContext} />}
    </>
  )
}

export default ClickableContact
