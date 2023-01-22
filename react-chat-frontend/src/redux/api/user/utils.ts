import { Contact, FormatedContact, Group } from 'types/app.types'

export function formatContacts(contacts: Contact[]): FormatedContact[] {
  return contacts?.map((contact) => ({
    id: contact.id,
    title: contact.username,
    avatar: contact.avatar,
    _type: 'contact',
  }))
}

export function formatGroups(groups: Group[]): FormatedContact[] {
  return groups?.map((group) => ({
    id: group.id,
    title: group.name,
    avatar: group.avatar,
    _type: 'group',
    members: group._count.users,
  }))
}
