import { ActionIcon, Modal } from '@components/ui-kit'
import useClickOutside from '@hooks/useClickOutside'
import React, { useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { BiZoomIn, BiZoomOut } from 'react-icons/bi'

const AvatarModal = ({ image, username, setIsModalOpen, isModalOpen }: any) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const headerIconsRef = useRef<HTMLDivElement | null>(null)
  useClickOutside(imgRef, (e) => {
    if (!headerIconsRef.current?.contains(e.target)) {
      setIsModalOpen(false)
    }
  })

  return (
    <Modal isOpened={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnClickOutside={false}>
      <div id='avatar-modal-header' className='w-full text-gray-300 px-4 py-2 flex items-center justify-between'>
        <div className='flex gap-2'>
          <img src={image} className='w-11 h-11' />
          <div className='flex flex-col'>
            <div className='font-semibold'>{username}</div>
            <div className='text-sm'>Profile Photo</div>
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
      <div className='w-full h-full flex items-center justify-center'>
        <img ref={imgRef} src={image} className='w-32 h-32' />
      </div>
    </Modal>
  )
}

export default AvatarModal
