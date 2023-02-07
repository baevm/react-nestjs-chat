import useClickOutside from '@hooks/useClickOutside'
import { useAppDispatch } from '@redux/hooks'
import { setReplyMessage } from '@redux/slices/chatSlice'
import formatTime from '@utils/formatTime'
import { useRef, useState } from 'react'
import { BsReply } from 'react-icons/bs'
import { IoTrashBinOutline } from 'react-icons/io5'
import { RiPencilFill } from 'react-icons/ri'
import { RepliedMessage } from 'types/app.types'
import { Avatar } from 'ui-kit/Avatar'
import { MenuItem } from 'ui-kit/Menu/Menu'
import MsgAppendix from './MsgAppendix'

type Props = {
  id: string
  username: string
  avatar: string
  text: string
  createdAt: string
  isOwn: boolean
  isGroup: boolean
  replyTo: RepliedMessage
}

const MessageItem = ({ id, text, createdAt, isOwn, username, avatar, isGroup, replyTo }: Props) => {
  const [posXY, setPosXY] = useState({ x: 0, y: 0 })
  const [contextMenuMsgId, setContextMenuMsgId] = useState<string | null>('')
  const contextRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
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

  function handleNewReply() {
    const msg = {
      id,
      username,
      avatar,
      text,
    }
    dispatch(setReplyMessage(msg))
  }

  return (
    <>
      <div
        className={`py-2 ${isOtherFromGroup ? 'px-12' : 'px-6'} relative flex rounded-md ${
          isOwn ? 'justify-end' : 'justify-start'
        } ${contextMenuMsgId ? 'bg-icon-hover-color' : ''}`}
        onContextMenu={handleOpenContext}>
        {isOtherFromGroup ? (
          <div className='absolute left-2 bottom-[12px] z-50 self-end'>
            <Avatar src={avatar} alt={`${username} avatar`} size='sm' />
          </div>
        ) : (
          ''
        )}
        <div
          className={`text-text-color relative my-[4px] flex flex-col justify-end rounded-t-xl p-2 shadow-md ${
            isOwn ? 'bg-chat-message-own-color rounded-bl-xl ' : 'bg-chat-message-color rounded-br-xl '
          }`}>
          {replyTo && (
            <div className='border-accent-color border-l-2 pl-2'>
              <div className='text-accent-color font-semibold'>{replyTo.user.username}</div>
              <div>{replyTo.text}</div>
            </div>
          )}
          {isOtherFromGroup ? <div className='text-active-item-color font-medium '>{username}</div> : ''}
          <div>{text}</div>
          <div
            className={`z-50 self-end text-xs ${
              isOwn ? 'text-chat-message-own-meta-color' : 'text-chat-message-meta-color'
            }`}>
            {formatTime(createdAt)}
          </div>
        </div>
        <MsgAppendix isOwn={isOwn} isOtherFromGroup={isOtherFromGroup} />
      </div>

      {contextMenuMsgId && (
        <div
          style={{ top: posXY.y, left: posXY.x }}
          ref={contextRef}
          className={`dropdown-shadow text-text-color fixed z-[1000] rounded-md border-gray-300 p-2`}>
          <MenuItem icon={<BsReply size='20' />} onClick={handleNewReply}>
            Reply
          </MenuItem>
          <MenuItem icon={<RiPencilFill size='20' />}>Edit</MenuItem>
          <MenuItem icon={<IoTrashBinOutline size='20' color='#DC2626' />} className='text-red-600'>
            Remove
          </MenuItem>
        </div>
      )}
    </>
  )
}

export default MessageItem
