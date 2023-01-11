import Menu from '@components/common/Menu'
import useClickOutside from '@hooks/useClickOutside'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { IoChatboxEllipsesOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5'
import { RiPencilFill } from 'react-icons/ri'
import NewContactModal from './NewContactModal'

type ButtonOptions = 'contact' | 'group' | 'message' | null

const FloatingButton = () => {
  const [type, setType] = useState<ButtonOptions>(null)
  const [isShow, setIsShow] = useState(false)

  const handleClose = () => {
    setType(null)
    setIsShow(false)
  }

  const handleOpen = (type: ButtonOptions) => {
    setType(type)
    setIsShow(false)
  }

  return (
    <div className='absolute z-50 bottom-4 right-4'>
      <Menu setIsOpen={setIsShow} isOpen={isShow}>
        <Menu.Target>
          <button className='w-14 h-14 relative flex items-center justify-center bg-active-item-color rounded-full active:scale-95'>
            <RiPencilFill color='white' />
          </button>
        </Menu.Target>
        <Menu.Dropdown className='bottom-16 right-4 text-text-color'>
          <Menu.Item onClick={() => handleOpen('contact')} icon={<IoPersonOutline size='20' />}>
            New contact
          </Menu.Item>
          <Menu.Item onClick={() => handleOpen('group')} icon={<IoPeopleOutline size='20' />}>
            New group
          </Menu.Item>
          <Menu.Item onClick={() => handleOpen('message')} icon={<IoChatboxEllipsesOutline size='20' />}>
            New message
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {type === 'contact' && createPortal(<NewContactModal isShow={true} handleClose={handleClose} />, document.body)}
    </div>
  )
}

export default FloatingButton