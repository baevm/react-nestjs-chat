import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppSelector } from '@redux/hooks'
import { ActionIcon } from '@ui-kit'
import { getContact } from '@utils/getContact'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineSearch } from 'react-icons/md'
import AvatarButton from './AvatarButton'
import BackButton from './BackButton'
import DotsMenu from './DotsMenu'

const RightSidebar = dynamic(() => import('../rightSidebar/RightSidebar'))

const ChatHeader = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const { data: user, isLoading } = useGetUserQuery()
  const { t } = useTranslation('common')

  const type = activeChat!.type
  const avatar = type === 'contact' ? getContact(activeChat?.participants, user?.id).avatar : null
  const title = type === 'contact' ? getContact(activeChat?.participants, user?.id).username : activeChat?.title
  const members = type === 'group' ? `${activeChat?.participants.length}` : ''

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  return (
    <>
      <div className='bg-background-color text-text-color flex h-14 w-full items-center justify-between p-2 shadow-sm'>
        <div className='w-full flex items-center gap-2 cursor-pointer' onClick={handleOpenSidebar}>
          <BackButton />
          <div className='flex items-center gap-2'>
            <AvatarButton avatar={avatar} title={title} />
            <div className='flex flex-col'>
              <div className='text-lg font-medium'>{title}</div>
              {members && (
                <div className='text-text-secondary-color text-sm leading-4'>
                  {members} {t('members')}
                </div>
              )}
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
      {isSidebarOpen && <RightSidebar setIsSidebarOpen={setIsSidebarOpen} />}
    </>
  )
}

export default ChatHeader
