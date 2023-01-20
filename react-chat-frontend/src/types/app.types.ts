export type Folder = {
  name: string
  id: string
  contacts: Contact[]
  groups: Group[]
}

export type Contact = {
  id: string
  username: string
  avatar: string | null
  messages: string[]
}

export type Group = {
  id: string
  name: string
  avatar: string
  messages: string[]
  _count: {
    users: number
  }
}

export type User = {
  id: string
  avatar: string
  username: string
  contacts: Contact[]
  folders: Folder[]
  groups: Group[]
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
