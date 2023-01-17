import useUser from '@hooks/useUser'
import { useMemo, useState } from 'react'
import { Panel } from 'react-resizable-panels'
import { Contact, Group } from 'types/app.types'
import ContactItem from './ContactItem'
import FloatingButton from './floatingButton/FloatingButton'
import SidebarHeader from './header/SidebarHeader'
import ResizeHandle from './ResizeHandle'

interface FormatedContact {
  id: string
  avatar: string | null
  title: string
  _type: 'contact' | 'group'
}

function formatContacts(contacts: Contact[] | undefined): FormatedContact[] | undefined {
  return contacts?.map(contact => ({
    id: contact.id,
    title: contact.username,
    avatar: contact.avatar,
    _type: 'contact',
  }))
}

function formatGroups(groups: Group[] | undefined): FormatedContact[] | undefined {
  return groups?.map(group => ({
    id: group.id,
    title: group.name,
    avatar: group.avatar,
    _type: 'group',
  }))
}

const Sidebar = () => {
  const { user, error, isError, isLoading } = useUser()
  const [activeFolder, setActiveFolder] = useState('All')
  const [clickedItem, setClickedItem] = useState<string | null>('')

 /*  const contacts = useMemo(() => {
    if (activeFolder === 'All') {
      return formatContacts(user?.contacts)
    } else {
      let contactsInFolder = user?.folders.find(folder => folder.name === activeFolder)?.contacts
      return formatContacts(contactsInFolder)
    }
  }, [user, activeFolder])

  const groups = useMemo(() => {
    if (activeFolder === 'All') {
      return formatGroups(user?.groups)
    } else {
      let contactsInFolder = user?.folders.find(folder => folder.name === activeFolder)?.groups
      return formatGroups(contactsInFolder)
    }
  }, [user, activeFolder])

  const chats = contacts && groups && [...contacts, ...groups]
 */

  return (
    <Panel
      className={`h-full w-full border-r-[1px] flex flex-col border-border-color bg-background-color relative`}
      maxSize={35}
      minSize={20}>
      <SidebarHeader setActiveFolder={setActiveFolder} activeFolder={activeFolder} />

      <div id='sidebar-chats' className='p-2 overflow-y-auto' onContextMenu={e => e.preventDefault()}>
        {user?.contacts.map(chat => (
          <ContactItem
            key={chat.id}
            id={chat.id}
            avatar={chat.avatar}
            title={chat.title}
            setClickedItem={setClickedItem}
            clickedItem={clickedItem}
          />
        ))}
      </div>
      <FloatingButton />
      <ResizeHandle />
    </Panel>
  )
}

export default Sidebar
