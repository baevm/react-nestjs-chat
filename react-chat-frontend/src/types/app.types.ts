export type Folder = {
  title: string
  count: number
}

type Contact = {
  id: string
  username: string
  avatar: string | null
  messages: string[]
}

export type User = {
  id: number
  avatar: string
  username: string
  contacts: Contact[]
}
