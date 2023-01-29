import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppSelector } from '@redux/hooks'
import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { Avatar } from 'ui-kit/Avatar'
import RightSidebar from '../rightSidebar/RightSidebar'
import AvatarModal from './AvatarModal'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

const ChatHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const { data: user, isLoading } = useGetUserQuery()

  const type = activeChat?.type
  const avatar = type === 'contact' ? getContact(activeChat?.participants, user?.id).avatar : null
  const title = type === 'contact' ? getContact(activeChat?.participants, user?.id).username : activeChat?.title
  const subtitle = type === 'group' ? `${activeChat?.participants.length} members` : ''

  const handleAvatarClick = () => {
    if (type === 'contact') {
      setIsModalOpen(true)
    } else if (type === 'group') {
      setIsSidebarOpen(true)
    }
  }

  return (
    <>
      <div className='p-2 w-full h-14 bg-background-color text-text-color shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <BackButton />
          <div className='flex gap-2 items-center'>
            <Avatar
              src={avatar}
              size='sm'
              onClick={handleAvatarClick}
              alt={`${title} avatar`}
              className='cursor-pointer'
            />
            <div className='flex flex-col'>
              <div className='font-medium text-lg'>{title}</div>
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
      {isModalOpen && (
        <AvatarModal image={avatar} username={title} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      )}
      {isSidebarOpen && <RightSidebar setIsSidebarOpen={setIsSidebarOpen} />}
    </>
  )
}

export default ChatHeader
