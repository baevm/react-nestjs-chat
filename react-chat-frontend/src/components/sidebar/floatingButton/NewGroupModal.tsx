import Modal from '@components/ui-kit/Modal'
import { useCreateGroupMutation } from '@redux/api/group/groupSlice'
import { useState } from 'react'

const NewGroupModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const [groupName, setGroupName] = useState('')
  const [handleCreate, { isLoading, isError }] = useCreateGroupMutation()

  if (!isShow) return null

  const handleAddContact = () => {
    if (!groupName) return

    handleCreate(groupName)
  }

  return (
    <Modal isOpened={isShow} onClose={handleClose} className='w-full h-full'>
      <div className='bg-background-color p-4 rounded-md'>
        <div className='modal-header'>
          <div className='text-lg font-semibold text-text-color'>New Group</div>
        </div>

        <div className='my-4'>
          <input
            onChange={(e) => {
              setGroupName(e.target.value)
            }}
            className='border-[1px] border-border-color bg-input-color text-text-color rounded-md p-2 focus:outline-none focus:border-active-item-color'
            placeholder='Group name'
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

export default NewGroupModal
