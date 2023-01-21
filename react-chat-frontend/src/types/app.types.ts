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

export type FormatedContact =
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

export interface FormatedUser extends Omit<User, 'contacts'> {
  contacts: FormatedContact[]
}

export type ChatType = 'contact' | 'group'
