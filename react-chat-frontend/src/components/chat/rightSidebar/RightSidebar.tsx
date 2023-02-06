import ContactItem from '@components/common/ContactItem'
import { useGetUserQuery } from '@redux/api/user/userSlice'
import { useAppSelector } from '@redux/hooks'
import { ActionIcon, Portal } from '@ui-kit'
import { getContact } from '@utils/getContact'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AddMemberButton from './AddMemberButton'

const TABS = ['Members', 'Media', 'Files', 'Links']

const TabItem = ({ tab, activeTab, setActiveTab }: any) => {
  return (
    <div
      className={`text-active-item-color border-active-item-color cursor-pointer py-4 font-medium ${
        activeTab === tab ? 'text-active-item-color border-b-2 ' : 'text-gray-500'
      }`}
      onClick={() => setActiveTab(tab)}>
      {tab}
    </div>
  )
}

const RightSidebar = ({ setIsSidebarOpen }: { setIsSidebarOpen: (val: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Members')

  const activeChat = useAppSelector((state) => state.ui.openedChat)
  const { data: currentUser, isLoading } = useGetUserQuery()

  const type = activeChat?.type
  const avatar =
    type === 'contact' ? getContact(activeChat?.participants, currentUser?.id).avatar ?? '/user.png' : '/user.png'
  const title = type === 'contact' ? getContact(activeChat?.participants, currentUser?.id).username : activeChat?.title

  return (
    <Portal>
      <div className='border-border-color bg-background-color text-text-color absolute right-0 top-0 z-50 flex h-full w-full flex-col border-l-[1px] md:max-w-sm'>
        <div className='flex h-14 items-center gap-2 p-2'>
          <ActionIcon onClick={() => setIsSidebarOpen(false)}>
            <IoClose size='26' />
          </ActionIcon>
          <h1 className='text-lg font-semibold'>User info</h1>
        </div>
        <div className='relative w-full'>
          <img src={avatar} className='w-full' alt={`${title} sidebar avatar`} />
          <div className='absolute bottom-0 px-4 text-lg text-black'>{title}</div>
        </div>
        <div className='border-border-color flex gap-2 border-b-[1px] px-4'>
          {TABS.map((tab) => (
            <TabItem key={tab} tab={tab} setActiveTab={setActiveTab} activeTab={activeTab} />
          ))}
        </div>
        <div className='flex flex-col px-4 py-2'>
          {activeChat?.participants.map(({ user }) => (
            <ContactItem
              key={user.id}
              avatar={user.avatar}
              title={user.username}
              subtitle={currentUser.id === user.id ? 'Owner' : ''}
            />
          ))}
        </div>
        {type === 'group' ? <AddMemberButton /> : null}
      </div>
    </Portal>
  )
}

export default RightSidebar
