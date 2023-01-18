import ActionIcon from '@components/ui-kit/ActionIcon'
import useUiStore from '@store/uiStore'
import { useRouter } from 'next/router'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const BackButton = () => {
  const router = useRouter()
  const { closeChat } = useUiStore(state => ({
    closeChat: state.closeChat,
  }))

  const handleBack = () => {
    closeChat()
    router.push('/chat')
  }

  // Only visible on mobile
  return (
    <ActionIcon className='md:hidden' onClick={handleBack}>
      <IoArrowBack />
    </ActionIcon>
  )
}

export default BackButton
