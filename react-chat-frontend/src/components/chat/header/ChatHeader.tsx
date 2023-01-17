import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MdOutlineSearch } from 'react-icons/md'
import { Contact } from 'types/app.types'
import ActionIcon from '../../common/ActionIcon'
import AvatarModal from './AvatarModal'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

type Props = {
  avatar: string | null
  title: string
  subtitle?: string
}

const ChatHeader = ({ avatar, title, subtitle }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const chatAvatar = avatar ? avatar : '/user.svg'

  return (
    <>
      <div className='p-2 w-full h-14 bg-background-color text-text-color shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <BackButton />
          <div className='flex gap-2 items-center'>
            <img src={chatAvatar} className='w-8 h-8 cursor-pointer' onClick={() => setIsModalOpen(true)} />
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
      {isModalOpen &&
        createPortal(
          <AvatarModal image={chatAvatar} username={title} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />,
          document.getElementById('portals') as Element
        )}
    </>
  )
}

export default ChatHeader
