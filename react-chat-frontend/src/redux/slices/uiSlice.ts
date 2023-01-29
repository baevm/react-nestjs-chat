import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Chat } from 'types/app.types'

export interface UiState {
  isChatOpen: boolean
  openedChat: Chat | null
}

const initialState: UiState = {
  isChatOpen: false,
  openedChat: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<Chat>) => {
      state.isChatOpen = true
      state.openedChat = action.payload
    },
    closeChat: (state) => {
      state.isChatOpen = false
      state.openedChat = null
    },
  },
})

export const { closeChat, openChat } = uiSlice.actions

export default uiSlice.reducer
