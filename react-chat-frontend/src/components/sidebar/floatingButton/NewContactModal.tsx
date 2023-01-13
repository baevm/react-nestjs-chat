import useAddContact from '@hooks/useAddContact'
import React, { useState } from 'react'

const NewContactModal = ({ isShow, handleClose }: { isShow: boolean; handleClose: () => void }) => {
  const [contactName, setContactName] = useState('')
  const { isLoading, handleAdd } = useAddContact()

  if (!isShow) return null

  const handleAddContact = () => {
    if (!contactName) return

    handleAdd(contactName)
  }

  return (
    <>
      <div className='modal-mask'>
        <div className='modal-wrapper'>
          <div className='modal-container'>
            <div className='modal-header'>
              <div className='text-lg font-semibold text-text-color'>New Contact</div>
            </div>

            <div className='modal-body'>
              <input
                onChange={e => {
                  setContactName(e.target.value)
                }}
                className='border-[1px] border-border-color bg-input-color text-text-color rounded-md p-2 focus:outline-none focus:border-active-item-color'
                placeholder='Username'
              />
            </div>

            <div className='modal-footer'>
              <button className='modal-default-button' onClick={() => handleClose()}>
                Cancel
              </button>
              <button className='modal-default-button' onClick={handleAddContact} disabled={isLoading}>
                {!isLoading ? 'Done' : 'Load...'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .modal-mask {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--modal-background);
            display: table;
            transition: opacity 0.3s ease;
          }

          .modal-wrapper {
            display: table-cell;
            vertical-align: middle;
          }

          .modal-container {
            width: 300px;
            margin: 0px auto;
            padding: 20px 30px;
            background-color: var(--background-color);
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
            border-radius: 10px;
          }

          .modal-header h3 {
            margin-top: 0;
            color: #42b983;
          }

          .modal-body {
            margin: 20px 0;
          }

          .modal-default-button {
            float: right;
            color: var(--active-item-color);
            font-weight: 500;
            text-transform: uppercase;
            border-radius: 5px;
            padding: 5px;
          }
          .modal-default-button:hover {
            background-color: var(--icon-hover-color);
          }

          .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
          }
        `}
      </style>
    </>
  )
}

export default NewContactModal
