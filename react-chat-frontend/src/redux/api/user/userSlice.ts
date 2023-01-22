import { getSocket } from '@services/socket'
import { apiSlice } from '../apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => '/user',
      providesTags: ['User'],
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          const { data } = await cacheDataLoaded

          const socket = getSocket()

          socket.connect()
          socket.on('connect', () => {
            socket.emit('user-online', { username: data.username, id: data.id })
          })
        } catch (error) {
          console.error(error)
        }
        await cacheEntryRemoved
      },
    }),

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

    getChats: builder.query<any, void>({
      query: () => '/user/chats',
      providesTags: ['Chats'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded

          const socket = getSocket()

          // update cached chat messages when receiving emit event from server
          socket.on('send-message-to-chat', (msg) => {
            console.log({ msg })

            updateCachedData((draft) => {
              let chat = draft.find((chat: any) => chat.id === msg.chatId)
              chat.messages.push(msg)

              return draft
            })
          })
        } catch (error) {
          console.error(error)
        }

        await cacheEntryRemoved
      },
    }),

    addContact: builder.mutation<any, string>({
      query: (contactName) => ({
        url: `/user/addContact/`,
        body: { username: contactName },
        method: 'POST',
      }),
      invalidatesTags: ['Chats'],
    }),

    createFolder: builder.mutation<any, string>({
      query: (folderName) => ({
        url: `/user/createFolder/`,
        body: { folderName },
      }),
    }),
  }),
})

export const { useGetUserQuery, useAddContactMutation, useGetChatsQuery, useSendMessageMutation } = userApi
