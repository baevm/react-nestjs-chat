import { ActionIcon } from '@ui-kit'
import { useState } from 'react'
import { MdOutlineSearch } from 'react-icons/md'
import { ChatType } from 'types/app.types'
import RightSidebar from '../rightSidebar/RightSidebar'
import AvatarModal from './AvatarModal'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

type Props = {
  avatar: string | null
  title: string
  subtitle?: string
  type: ChatType | undefined
}

const ChatHeader = ({ avatar, title, subtitle, type }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const chatAvatar = avatar ? avatar : '/user.png'

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
            <img
              src={chatAvatar}
              className='w-8 h-8 cursor-pointer rounded-full'
              onClick={handleAvatarClick}
              alt={`${title} avatar`}
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
        <AvatarModal image={chatAvatar} username={title} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      )}
      {isSidebarOpen && (
        <RightSidebar
          image={chatAvatar}
          username={title}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          type={type}
        />
      )}
    </>
  )
}

export default ChatHeader
