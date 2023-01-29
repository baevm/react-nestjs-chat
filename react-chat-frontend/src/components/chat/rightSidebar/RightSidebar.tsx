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
      className={`py-4 text-active-item-color font-medium border-active-item-color cursor-pointer ${
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
      <div className='w-full border-border-color border-l-[1px] absolute right-0 top-0 md:max-w-sm z-50 bg-background-color text-text-color h-full flex flex-col'>
        <div className='flex gap-2 items-center h-14 p-2'>
          <ActionIcon onClick={() => setIsSidebarOpen(false)}>
            <IoClose size='26' />
          </ActionIcon>
          <h1 className='font-semibold text-lg'>User info</h1>
        </div>
        <div className='w-full relative'>
          <img src={avatar} className='w-full' alt={`${title} sidebar avatar`} />
          <div className='absolute bottom-0 px-4 text-lg text-black'>{title}</div>
        </div>
        <div className='px-4 flex gap-2 border-border-color border-b-[1px]'>
          {TABS.map((tab) => (
            <TabItem key={tab} tab={tab} setActiveTab={setActiveTab} activeTab={activeTab} />
          ))}
        </div>
        <div className='px-4 py-2 flex flex-col'>
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
