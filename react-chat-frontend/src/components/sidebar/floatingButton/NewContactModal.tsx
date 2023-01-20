import Modal from '@components/ui-kit/Modal'
import { useState } from 'react'
import { useAddContactMutation } from 'redux/api/user/userSlice'

const NewContactModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const [contactName, setContactName] = useState('')
  const [handleAdd, { isLoading, isError }] = useAddContactMutation()

  if (!isShow) return null

  const handleAddContact = () => {
    if (!contactName) return

    handleAdd(contactName)
  }

  return (
    <Modal isOpened={isShow} onClose={handleClose} className='w-full h-full'>
      <div className='bg-background-color p-4 rounded-md'>
        <div className='modal-header'>
          <div className='text-lg font-semibold text-text-color'>New Contact</div>
        </div>

        <div className='my-4'>
          <input
            onChange={(e) => {
              setContactName(e.target.value)
            }}
            className='border-[1px] border-border-color bg-input-color text-text-color rounded-md p-2 focus:outline-none focus:border-active-item-color'
            placeholder='Username'
          />
        </div>

        <div className='flex gap-2 justify-end font-semibold'>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color p-1 rounded-md'
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color p-1 rounded-md'
            onClick={handleAddContact}
            disabled={isLoading}>
            {!isLoading ? 'Done' : 'Load...'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default NewContactModal
