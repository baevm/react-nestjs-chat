import { apiSlice } from '../apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => '/user',
      providesTags: ['User'],
    }),

    getChats: builder.query<any, void>({
      query: () => '/user/chats',
      providesTags: ['Chats'],
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
