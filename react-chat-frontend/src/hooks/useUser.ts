import { useQuery } from '@tanstack/react-query'
import { Contact, Group, User } from 'types/app.types'
import { getUser } from '../services/mutations'

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
  return contacts?.map(contact => ({
    id: contact.id,
    title: contact.username,
    avatar: contact.avatar,
    _type: 'contact',
  }))
}

function formatGroups(groups: Group[]): FormatedContact[] {
  return groups?.map(group => ({
    id: group.id,
    title: group.name,
    avatar: group.avatar,
    _type: 'group',
    members: group._count.users,
  }))
}

export default function useUser() {
  const { data, isLoading, isError, error } = useQuery(['user'], getUser, {
    staleTime: 5000,
    select: data => {
      return {
        ...data,
        contacts: [...formatContacts(data.contacts), ...formatGroups(data.groups)],
      } as FormatedUser
    },
  })

  return { user: data, isLoading, isError, error }
}
