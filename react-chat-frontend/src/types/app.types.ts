export type Folder = {
  name: string
  id: string
  contacts: Contact[]
}

export type Contact = {
  id: string
  username: string
  avatar: string | null
  messages: string[]
}

export type User = {
  id: string
  avatar: string
  username: string
  contacts: Contact[]
  folders: Folder[]
}
