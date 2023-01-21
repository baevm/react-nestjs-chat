export type Folder = {
  name: string
  id: string
}

export type User = {
  id: string
  avatar: string
  username: string
  chats: Chat[]
  folders: Folder[]
}

export type Participant = {
  id: string
  username: string
  avatar: string | null
}

export type Chat = {
  id: string
  title: string
  type: ChatType
  messages: string[]
  participants: Participant[]
}



export type ChatType = 'contact' | 'group'
