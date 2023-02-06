import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ChatType } from 'types/app.types'
import { Avatar } from 'ui-kit/Avatar'

const RightSidebar = dynamic(() => import('../rightSidebar/RightSidebar'))
const AvatarModal = dynamic(() => import('./AvatarModal'))

const AvatarButton = ({ avatar, type, title }: { avatar: string; type: ChatType; title: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleAvatarClick = () => {
    if (type === 'contact') {
      setIsModalOpen(true)
    } else if (type === 'group') {
      setIsSidebarOpen(true)
    }
  }

  return (
    <>
      <Avatar src={avatar} size='sm' onClick={handleAvatarClick} alt={`${title} avatar`} className='cursor-pointer' />
      {isModalOpen && (
        <AvatarModal image={avatar} username={title} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      )}

      {isSidebarOpen && <RightSidebar setIsSidebarOpen={setIsSidebarOpen} />}
    </>
  )
}

export default AvatarButton
