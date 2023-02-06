import useClickOutside from '@hooks/useClickOutside'
import { useRef, useState } from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import { Avatar } from 'ui-kit/Avatar'
import { MenuItem } from 'ui-kit/Menu/Menu'
import MsgAppendix from './MsgAppendix'

type Props = {
  id: string
  username?: string
  avatar: string
  text: string
  createdAt: string
  isOwn: boolean
  isGroup: boolean
}

const MessageItem = ({ id, text, createdAt, isOwn, username, avatar, isGroup }: Props) => {
  const [posXY, setPosXY] = useState({ x: 0, y: 0 })
  const [contextMenuMsgId, setContextMenuMsgId] = useState<string | null>('')
  const contextRef = useRef<HTMLDivElement | null>(null)
  const isOtherFromGroup = !isOwn && isGroup

  useClickOutside(contextRef, handleCloseContext)

  function handleOpenContext(e: React.MouseEvent) {
    e.preventDefault()

    setContextMenuMsgId(id)
    setPosXY({ x: e.pageX, y: e.pageY })
  }

  function handleCloseContext() {
    setContextMenuMsgId(null)
    setPosXY({ x: 0, y: 0 })
  }

  return (
    <>
      <div
        className={`py-2 ${isOtherFromGroup ? 'px-6' : ''} relative flex rounded-md ${
          isOwn ? 'justify-end' : 'justify-start'
        } ${contextMenuMsgId ? 'bg-icon-hover-color' : ''}`}
        onContextMenu={handleOpenContext}>
        {isOtherFromGroup ? (
          <div className='absolute -left-4 bottom-[12px] z-50 self-end'>
            <Avatar src={avatar} alt={`${username} avatar`} size='sm' />
          </div>
        ) : (
          ''
        )}
        <div
          className={`text-text-color relative my-[4px] flex flex-col justify-end rounded-t-xl p-2 shadow-md ${
            isOwn ? 'bg-chat-message-own-color rounded-bl-xl ' : 'bg-chat-message-color rounded-br-xl '
          }`}>
          {!isOwn ? <div className='text-active-item-color font-medium '>{username}</div> : ''}
          <div>{text}</div>
          <div
            className={`z-50 self-end text-xs ${
              isOwn ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
            }`}>
            {createdAt}
          </div>
        </div>
        <MsgAppendix isOwn={isOwn} isOtherFromGroup={isOtherFromGroup} />
      </div>

      {contextMenuMsgId === id && (
        <div
          style={{ top: posXY.y, left: posXY.x }}
          ref={contextRef}
          className={`dropdown-shadow text-text-color fixed z-[1000] rounded-md border-gray-300 p-2`}>
          <MenuItem icon={<IoFolderOpenOutline size='20' />}>Add to folder</MenuItem>
        </div>
      )}
    </>
  )
}

export default MessageItem
