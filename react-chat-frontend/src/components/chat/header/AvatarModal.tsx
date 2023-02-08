import useClickOutside from '@hooks/useClickOutside'
import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { BiZoomIn, BiZoomOut } from 'react-icons/bi'
import { ActionIcon, Modal } from '@ui-kit'
import { Avatar } from 'ui-kit/Avatar'
import { useTranslation } from 'react-i18next'

const AvatarModal = ({ image, username, setIsModalOpen, isModalOpen }: any) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const headerIconsRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation('common')

  useClickOutside(imgRef, (e) => {
    if (!headerIconsRef.current?.contains(e.target)) {
      setIsModalOpen(false)
    }
  })

  const avatar = image ? image : '/images/user.png'

  return (
    <Modal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnClickOutside={false}>
      <div id='avatar-modal-header' className='flex w-full items-center justify-between px-4 py-2 text-gray-300'>
        <div className='flex gap-2'>
          <Avatar src={avatar} size='lg' alt={`${username} avatar`} />
          <div className='flex flex-col'>
            <div className='font-semibold'>{username}</div>
            <div className='text-sm'>{t('profile-photo')}</div>
          </div>
        </div>
        <div ref={headerIconsRef}>
          <ActionIcon>
            <BiZoomIn size='22' />
          </ActionIcon>
          <ActionIcon>
            <BiZoomOut size='22' />
          </ActionIcon>
          <ActionIcon onClick={() => setIsModalOpen(false)}>
            <IoClose />
          </ActionIcon>
        </div>
      </div>
      <div className='flex h-full w-full items-center justify-center'>
        <img ref={imgRef} src={avatar} className='h-32 w-32' alt={`${username} opened avatar`} />
      </div>
    </Modal>
  )
}

export default AvatarModal
