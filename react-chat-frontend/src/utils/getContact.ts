export function getContact(participants: any, currUserId: string | undefined) {
  const contact = participants.find(({ user }: any) => user.id !== currUserId)

  return contact.user
}
