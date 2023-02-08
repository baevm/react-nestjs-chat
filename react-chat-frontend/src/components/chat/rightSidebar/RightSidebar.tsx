import ContactItem from '@components/common/ContactItem'
import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppSelector } from '@redux/hooks'
import { ActionIcon, Portal } from '@ui-kit'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import AddMemberButton from './AddMemberButton'

type Tabs = 'followers' | 'media' | 'files' | 'links'

const TabItem = ({ tabLabel, activeTab, setActiveTab, value }: any) => {
  return (
    <div
      className={`text-active-item-color border-active-item-color cursor-pointer py-4 font-medium first-letter:uppercase
      ${activeTab === value ? 'text-active-item-color border-b-2 ' : 'text-gray-500'}`}
      onClick={() => setActiveTab(value)}>
      {tabLabel}
    </div>
  )
}

const RightSidebar = ({ setIsSidebarOpen }: { setIsSidebarOpen: (val: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState<Tabs>('followers')
  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const { data: currentUser, isLoading } = useGetUserQuery()
  const { t } = useTranslation('common')

  const TABS = [
    { value: 'followers', label: t('followers') },
    { value: 'media', label: t('media') },
    { value: 'files', label: t('files') },
    { value: 'links', label: t('links') },
  ]

  const type = activeChat?.type
  const avatar =
    type === 'contact'
      ? getContact(activeChat?.participants, currentUser?.id).avatar ?? '/images/user.png'
      : '/images/user.png'
  const title = type === 'contact' ? getContact(activeChat?.participants, currentUser?.id).username : activeChat?.title

  return (
    <Portal>
      <div className='border-border-color bg-background-color text-text-color absolute right-0 top-0 z-50 flex h-full w-full flex-col border-l-[1px] md:max-w-sm'>
        <div className='flex h-14 items-center gap-2 p-2'>
          <ActionIcon onClick={() => setIsSidebarOpen(false)}>
            <IoClose size='26' />
          </ActionIcon>
          <h1 className='text-lg font-semibold'>{type === 'contact' ? t('info') : t('channel-info')}</h1>
        </div>
        <div className='relative w-full'>
          <img src={avatar} className='w-full' alt={`${title} sidebar avatar`} />
          <div className='absolute bottom-0 px-4 text-lg text-black'>{title}</div>
        </div>
        <div className='border-border-color flex gap-2 border-b-[1px] px-4'>
          {TABS.map((tab) => (
            <TabItem
              key={tab}
              tabLabel={tab.label}
              value={tab.value}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          ))}
        </div>
        <div className='flex flex-col px-4 py-2'>
          {activeChat?.participants.map(({ user }) => (
            <ContactItem
              key={user.id}
              avatar={user.avatar}
              title={user.username}
              subtitle={currentUser.id === user.id ? t('owner')! : ''}
            />
          ))}
        </div>
        {type === 'group' ? <AddMemberButton /> : null}
      </div>
    </Portal>
  )
}

export default RightSidebar
