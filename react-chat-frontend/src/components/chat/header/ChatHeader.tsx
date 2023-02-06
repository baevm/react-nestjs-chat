import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppSelector } from '@redux/hooks'
import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import { MdOutlineSearch } from 'react-icons/md'
import AvatarButton from './AvatarButton'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

const ChatHeader = () => {
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const { data: user, isLoading } = useGetUserQuery()

  const type = activeChat!.type
  const avatar = type === 'contact' ? getContact(activeChat?.participants, user?.id).avatar : null
  const title = type === 'contact' ? getContact(activeChat?.participants, user?.id).username : activeChat?.title
  const subtitle = type === 'group' ? `${activeChat?.participants.length} members` : ''

  return (
    <div className='bg-background-color text-text-color flex h-14 w-full items-center justify-between p-2 shadow-sm'>
      <div className='flex items-center gap-2'>
        <BackButton />
        <div className='flex items-center gap-2'>
          <AvatarButton avatar={avatar} type={type} title={title} />
          <div className='flex flex-col'>
            <div className='text-lg font-medium'>{title}</div>
            {subtitle && <div className='text-text-secondary-color text-sm leading-4'>{subtitle}</div>}
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <ActionIcon>
          <MdOutlineSearch />
        </ActionIcon>
        <DotsMenu />
      </div>
    </div>
  )
}

export default ChatHeader
