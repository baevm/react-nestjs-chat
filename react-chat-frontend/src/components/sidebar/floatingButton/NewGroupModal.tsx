import { useCreateGroupMutation } from '@redux/api/group/groupSlice'
import { useState } from 'react'
import { Modal } from 'ui-kit'

const NewGroupModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const [groupName, setGroupName] = useState('')
  const [handleCreate, { isLoading, isError }] = useCreateGroupMutation()

  const handleAddContact = () => {
    if (!groupName) return

    handleCreate(groupName)
  }

  return (
    <Modal isOpened={isShow} onClose={handleClose}>
      <div className='bg-background-color rounded-md p-4'>
        <div className='modal-header'>
          <div className='text-text-color text-lg font-semibold'>New Group</div>
        </div>

        <div className='my-4'>
          <input
            onChange={(e) => {
              setGroupName(e.target.value)
            }}
            className='border-border-color bg-input-color text-text-color focus:border-active-item-color rounded-md border-[1px] p-2 focus:outline-none'
            placeholder='Group name'
          />
        </div>

        <div className='flex justify-end gap-2 font-semibold'>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color rounded-md p-1'
            onClick={() => handleClose()}>
            Cancel
          </button>
          <button
            className='modal-default-button text-active-item-color hover:bg-icon-hover-color rounded-md p-1'
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
