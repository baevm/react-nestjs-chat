import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MdOutlineSearch } from 'react-icons/md'
import { Contact } from 'types/app.types'
import ActionIcon from '../../common/ActionIcon'
import AvatarModal from './AvatarModal'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

const ChatHeader = ({ activeChat }: { activeChat: Contact }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const chatAvatar = activeChat.avatar ? activeChat.avatar : '/user.svg'

  return (
    <>
      <div className='p-2 w-full h-14 bg-background-color text-text-color shadow-sm flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <BackButton />
          <div className='flex gap-2 items-center'>
            <img src={chatAvatar} className='w-8 h-8 cursor-pointer' onClick={() => setIsModalOpen(true)} />
            <div className='font-medium text-lg'>{activeChat.username}</div>
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
          <AvatarModal image={chatAvatar} username={activeChat.username} setIsModalOpen={setIsModalOpen} />,
          document.body
        )}
    </>
  )
}

export default ChatHeader
