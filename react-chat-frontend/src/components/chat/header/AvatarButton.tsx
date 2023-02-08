import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Avatar } from 'ui-kit/Avatar'

const AvatarModal = dynamic(() => import('./AvatarModal'))

const AvatarButton = ({ avatar, title }: { avatar: string; title: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <Avatar
        src={avatar}
        size='sm'
        onClick={handleAvatarClick}
        alt={`${title} avatar`}
        className='cursor-pointer'
      />
      {isModalOpen && (
        <AvatarModal image={avatar} username={title} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
      )}
    </>
  )
}

export default AvatarButton
