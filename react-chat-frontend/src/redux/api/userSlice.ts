import { Contact, Group, User } from 'types/app.types'
import { apiSlice } from './apiSlice'

type FormatedContact =
  | {
      id: string
      avatar: string | null
      title: string
      _type: 'group'
      members: number
    }
  | {
      id: string
      avatar: string | null
      title: string
      _type: 'contact'
    }

interface FormatedUser extends Omit<User, 'contacts'> {
  contacts: FormatedContact[]
}

function formatContacts(contacts: Contact[]): FormatedContact[] {
  return contacts?.map((contact) => ({
    id: contact.id,
    title: contact.username,
    avatar: contact.avatar,
    _type: 'contact',
  }))
}

function formatGroups(groups: Group[]): FormatedContact[] {
  return groups?.map((group) => ({
    id: group.id,
    title: group.name,
    avatar: group.avatar,
    _type: 'group',
    members: group._count.users,
  }))
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<FormatedUser, void>({
      query: () => '/user',
      transformResponse: (res: any) => {
        return {
          ...res,
          contacts: [...formatContacts(res.contacts), ...formatGroups(res.groups)],
        } as FormatedUser
      },
    }),

    getUserMessages: builder.query<any, string | null>({
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
      }),
    }),

    createFolder: builder.mutation<any, string>({
      query: (folderName) => ({
        url: `/user/createFolder/`,
        body: { folderName },
      }),
    }),
  }),
})

export const { useGetUserQuery, useGetUserMessagesQuery } = userApi
