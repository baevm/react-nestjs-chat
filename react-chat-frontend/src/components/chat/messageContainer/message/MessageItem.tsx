import { useAppDispatch } from '@redux/hooks'
import { setReplyMessage } from '@redux/slices/chatSlice'
import { Avatar, cls, ContextMenu } from '@ui-kit'
import formatTime from '@utils/formatTime'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsReply } from 'react-icons/bs'
import { IoTrashBinOutline } from 'react-icons/io5'
import { RiPencilFill } from 'react-icons/ri'
import { RepliedMessage as RepliedMessageType } from 'types/app.types'
import MsgAppendix from './MsgAppendix'
import RepliedMessage from './RepliedMessage'

type Props = {
  id: string
  username: string
  avatar: string
  text: string
  createdAt: string
  isOwn: boolean
  isGroup: boolean
  replyTo: RepliedMessageType
}

const MessageItem = ({ id, text, createdAt, isOwn, username, avatar, isGroup, replyTo }: Props) => {
  const [contextMenuMsgId, setContextMenuMsgId] = useState<string | null>('')
  const dispatch = useAppDispatch()
  const isOtherFromGroup = !isOwn && isGroup
  const { t } = useTranslation('common')

  const handleNewReply = () => {
    const msg = {
      id,
      username,
      avatar,
      text,
    }
    dispatch(setReplyMessage(msg))
  }

  const handleEdit = () => {
    console.log('not implemented yet')
  }

  return (
    <ContextMenu onOpen={() => setContextMenuMsgId(id)} onClose={() => setContextMenuMsgId('')}>
      <ContextMenu.Target>
        <div
          className={cls(
            `relative flex rounded-md py-2`,
            isOtherFromGroup ? 'px-12' : 'px-6',
            isOwn ? 'justify-end' : 'justify-start',
            contextMenuMsgId && 'bg-icon-hover-color'
          )}>
          {isOtherFromGroup && (
            <div className='absolute left-2 bottom-[12px] z-50 self-end'>
              <Avatar src={avatar} alt={`${username} avatar`} size='sm' />
            </div>
          )}
          <div
            className={`text-text-color relative my-[4px] flex flex-col justify-end rounded-t-xl p-2 shadow-md ${
              isOwn ? 'bg-chat-message-own-color rounded-bl-xl ' : 'bg-chat-message-color rounded-br-xl '
            }`}>
            {replyTo && <RepliedMessage text={replyTo.text} username={replyTo.user.username} />}
            {isOtherFromGroup ? <div className='text-active-item-color font-medium'>{username}</div> : ''}
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
      </ContextMenu.Target>

      <ContextMenu.Dropdown>
        <ContextMenu.Item icon={<BsReply size='20' />} onClick={handleNewReply}>
          {t('reply')}
        </ContextMenu.Item>
        <ContextMenu.Item icon={<RiPencilFill size='20' />} onClick={handleEdit}>
          {t('edit')}
        </ContextMenu.Item>
        <ContextMenu.Item icon={<IoTrashBinOutline size='20' color='#DC2626' />} className='text-red-600'>
          {t('delete')}
        </ContextMenu.Item>
      </ContextMenu.Dropdown>
    </ContextMenu>
  )
}

export default MessageItem
