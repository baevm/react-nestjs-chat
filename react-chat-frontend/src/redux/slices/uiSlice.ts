import { createSlice } from '@reduxjs/toolkit'

export interface UiState {
  isChatOpen: boolean
}

const initialState: UiState = {
  isChatOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openChat: state => {
      state.isChatOpen = true
    },
    closeChat: state => {
      state.isChatOpen = false
    },
  },
})

export const { closeChat, openChat } = uiSlice.actions

export default uiSlice.reducer
