import { RootState } from '@redux/store'
import { getSocket } from '@services/socket'
import { playSound } from '@utils/playSound'
import { Chat, RepliedMessage } from 'types/app.types'
import { apiSlice } from '../apiSlice'

type MessageFromServer = {
  chatId: string
  createdAt: string
  id: string
  receiverId: string
  text: string
  userId: string
  reply_to: RepliedMessage
}

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
          return
        }
        await cacheEntryRemoved
      },
      extraOptions: { maxRetries: 2 },
    }),

    getChats: builder.query<Chat[], void>({
      query: () => '/user/chats',
      providesTags: ['Chats'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, getState }) {
        try {
          await cacheDataLoaded

          const socket = getSocket()

          // on unread message event
          // check if opened chat id from store is equal to chatId from message
          // if equal emit message read to server
          socket.on('unread-message', (msg) => {
            const currentUser = getState().api.queries['getUser(undefined)']?.data as { id: string }
            const openedChatId = (getState() as RootState).ui.openedChat?.chatId

            if (openedChatId === msg.chatId) {
              socket.emit('message-read', { userId: currentUser.id, chatId: msg.chatId })
            } else {
              playSound()
            }
          })

          // update cached chat messages when receiving emit event from server
          // if opened chat id from store not equal to chatId from message
          // update unread count
          socket.on('send-message-to-chat', (msg: MessageFromServer) => {
            console.log({ msg })
            const openedChatId = (getState() as RootState).ui.openedChat?.chatId

            updateCachedData((draft) => {
              let chat = draft.find((chat) => chat.chatId === msg.chatId) as Chat
              chat.messages.push(msg)

              if (openedChatId !== msg.chatId) {
                chat.unreadCount = chat.unreadCount + 1
              }

              return draft
            })
          })
        } catch (error) {
          console.error(error)
        }
        await cacheEntryRemoved
      },
      transformResponse: (data: any) => {
        const formatedChats = data.map((item: any) => ({
          id: item.id,
          chatId: item.chatId,
          unreadCount: item.unreadCount,
          messages: item.chat.messages,
          participants: item.chat.participants,
          title: item.chat.title,
          type: item.chat.type,
        }))

        return formatedChats
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

export const { useGetUserQuery, useAddContactMutation, useGetChatsQuery } = userApi
