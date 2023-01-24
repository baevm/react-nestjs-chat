import { useAppDispatch } from 'redux/hooks'
import { closeChat } from 'redux/slices/uiSlice'
import { useRouter } from 'next/router'
import { IoArrowBack } from 'react-icons/io5'
import { ActionIcon } from '@components/ui-kit'

const BackButton = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleBack = () => {
    dispatch(closeChat())
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
