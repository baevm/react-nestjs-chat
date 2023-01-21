import { FormatedUser } from 'types/app.types'
import { apiSlice } from '../apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<FormatedUser, void>({
      query: () => '/user',
      transformResponse: (res: any) => {
        return {
          ...res.user,
          chats: res.chats,
        }
      },
      providesTags: ['User'],
    }),

    getMessages: builder.query<any, string | null>({
      query: (contactId) => {
        if (contactId?.startsWith('U')) {
          return `/user/messages/${contactId}`
        } else if (contactId?.startsWith('G')) {
          return `/group/messages/${contactId}`
        } else {
          return ''
        }
      },
    }),

    addContact: builder.mutation<any, string>({
      query: (contactName) => ({
        url: `/user/addContact/`,
        body: { username: contactName },
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    createFolder: builder.mutation<any, string>({
      query: (folderName) => ({
        url: `/user/createFolder/`,
        body: { folderName },
      }),
    }),
  }),
})

export const { useGetUserQuery, useGetMessagesQuery, useAddContactMutation } = userApi
