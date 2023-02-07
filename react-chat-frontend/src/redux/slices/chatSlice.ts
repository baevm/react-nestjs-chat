import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Message } from 'types/app.types'

type ReplyMessage = {
  id: string
  username: string
  avatar: string
  text: string
}

export interface ChatState {
  replyMessage: ReplyMessage | null
}

const initialState: ChatState = {
  replyMessage: null,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setReplyMessage: (state, action: PayloadAction<ReplyMessage | null>) => {
      state.replyMessage = action.payload
    },
  },
})

export const { setReplyMessage } = chatSlice.actions

export default chatSlice.reducer
