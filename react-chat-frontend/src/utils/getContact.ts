export function getContact(participants: any, currUserId: string | undefined) {
  const contact = participants.find(({ user }: any) => user.id !== currUserId)

  if (!contact) {
    return {
      username: 'Deleted',
    }
  }

  return contact.user
}
