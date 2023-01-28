import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isChatOpen: boolean
  openedChatId: string | null
}

const initialState: UiState = {
  isChatOpen: false,
  openedChatId: null,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openChat: (state, action: PayloadAction<string>) => {
      state.isChatOpen = true
      state.openedChatId = action.payload
    },
    closeChat: (state) => {
      state.isChatOpen = false
      state.openedChatId = null
    },
  },
})

export const { closeChat, openChat } = uiSlice.actions

export default uiSlice.reducer
