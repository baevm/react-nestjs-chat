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

export type RepliedMessage = {
  id: string
  text: string
  user: {
    avatar: string | null
    username: string
  }
}

export type Message = {
  chatId: string
  createdAt: string
  id: string
  text: string
  updatedAt?: string
  userId: string
  reply_to: RepliedMessage
}

export type Chat = {
  id: string
  chatId: string
  title: string
  unreadCount: number
  type: ChatType
  messages: Message[]
  participants: [{ user: Participant }]
}

export type ChatType = 'contact' | 'group'
