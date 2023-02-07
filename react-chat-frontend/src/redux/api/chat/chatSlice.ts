import { getSocket } from '@services/socket'
import { apiSlice } from '../apiSlice'
import { userApi } from '../user/userSlice'

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<any, any>({
      queryFn: (message: any) => {
        const socket = getSocket()

        return new Promise((resolve) => {
          socket.emit('send-message-to-server', message, (message: any) => {
            resolve({ data: message })
          })
        })
      },
    }),

    updateUnreadCount: builder.mutation<any, string>({
      query: (chatId) => ({
        url: '/chat/updateUnreadCount',
        body: { chatId },
        method: 'POST',
      }),
      async onQueryStarted(chatId, { dispatch }) {
        dispatch(
          userApi.util.updateQueryData('getChats', undefined, (draft) => {
            let chat = draft.find((chat: any) => chat.chatId === chatId)
            chat!.unreadCount = 0

            return draft
          })
        )
      },
    }),
  }),
})

export const { useSendMessageMutation, useUpdateUnreadCountMutation } = chatSlice
