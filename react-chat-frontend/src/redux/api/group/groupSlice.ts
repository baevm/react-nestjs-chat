import { apiSlice } from '../apiSlice'

export const groupSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<any, string>({
      query: (groupName) => ({
        url: '/group/createGroup/',
        method: 'POST',
        body: { groupName },
      }),
      invalidatesTags: ['Chats'],
    }),

    addToGroup: builder.mutation<any, { groupId: string; contactName: string }>({
      query: ({ groupId, contactName }) => ({
        url: '/group/invite/',
        method: 'POST',
        body: { groupId, username: contactName },
      }),
    }),
  }),
})

export const { useAddToGroupMutation, useCreateGroupMutation } = groupSlice
