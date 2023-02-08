import { useAppSelector } from 'redux/hooks'
import { useState } from 'react'
import { IoChatboxEllipsesOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5'
import { RiPencilFill } from 'react-icons/ri'
import { ChatType } from 'types/app.types'
import NewContactModal from './NewContactModal'
import NewGroupModal from './NewGroupModal'
import { Menu } from '@ui-kit'
import { useTranslation } from 'react-i18next'

type ButtonOptions = ChatType | 'message' | null

const FloatingButton = () => {
  const [type, setType] = useState<ButtonOptions>(null)
  const [isShow, setIsShow] = useState(false)
  const isChatOpen = useAppSelector((state) => state.ui.isChatOpen)
  const { t } = useTranslation(['sidebar'])

  const handleClose = () => {
    setType(null)
    setIsShow(false)
  }

  const handleOpen = (type: ButtonOptions) => {
    setType(type)
    setIsShow(false)
  }

  return (
    <div className={`absolute bottom-4 right-4 z-50 ${isChatOpen ? 'hidden md:block' : ''}`}>
      <Menu setIsOpen={setIsShow} isOpen={isShow}>
        <Menu.Target>
          <button className='bg-active-item-color relative flex h-14 w-14 items-center justify-center rounded-full active:scale-95'>
            <RiPencilFill color='white' />
          </button>
        </Menu.Target>
        <Menu.Dropdown className='text-text-color bottom-16 right-4'>
          <Menu.Item onClick={() => handleOpen('contact')} icon={<IoPersonOutline size='20' />}>
            {t('floating-button.new-contact')}
          </Menu.Item>
          <Menu.Item onClick={() => handleOpen('group')} icon={<IoPeopleOutline size='20' />}>
            {t('floating-button.new-group')}
          </Menu.Item>
          <Menu.Item onClick={() => handleOpen('message')} icon={<IoChatboxEllipsesOutline size='20' />}>
            {t('floating-button.new-message')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {type === 'contact' && <NewContactModal isShow={true} handleClose={handleClose} />}
      {type === 'group' && <NewGroupModal isShow={true} handleClose={handleClose} />}
    </div>
  )
}

export default FloatingButton
