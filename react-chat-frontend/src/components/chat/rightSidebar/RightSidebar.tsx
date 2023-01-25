import { ActionIcon, Portal } from '@ui-kit'
import { useState } from 'react'
import { IoClose, IoPersonAddOutline } from 'react-icons/io5'
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

const RightSidebar = ({ type, image, username, setIsSidebarOpen, isSidebarOpen }: any) => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Members')

  const target = document.getElementById('chat-container') as Element

  return (
    <Portal target={target}>
      <div className='w-full border-border-color border-l-[1px] absolute right-0 top-0 md:max-w-sm z-50 lg:relative bg-background-color text-text-color h-full flex flex-col'>
        <div className='flex gap-2 items-center h-14 p-2'>
          <ActionIcon onClick={() => setIsSidebarOpen(false)}>
            <IoClose size='26' />
          </ActionIcon>
          <h1 className='font-semibold text-lg'>User info</h1>
        </div>
        <div className='w-full relative'>
          <img src={image} className='w-full' />
          <div className='absolute bottom-0 px-4 text-lg text-black'>{username}</div>
        </div>
        <div className='px-4 flex gap-2 border-border-color border-b-[1px]'>
          {TABS.map((tab) => (
            <TabItem key={tab} tab={tab} setActiveTab={setActiveTab} activeTab={activeTab} />
          ))}
        </div>
        {type === 'group' ? <AddMemberButton /> : null}
      </div>
    </Portal>
  )
}

export default RightSidebar
