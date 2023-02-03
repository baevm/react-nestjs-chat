import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ChatService } from 'src/chat/chat.service'
import { ResponseDto } from 'src/common/dtos/response.dto'
import generateId from 'src/common/helpers/generateId'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private chatService: ChatService) {}

  async createUser(username: string, password: string) {
    const user = await this.prisma.user.create({
      data: {
        id: generateId('U'),
        username,
        password,
      },
    })

    return user
  }

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async getChats(userId: string) {
    const chats = await this.prisma.participants.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        unreadCount: true,
        chatId: true,
        chat: {
          select: {
            type: true,
            messages: true,
            title: true,
            participants: {
              select: {
                user: {
                  select: {
                    avatar: true,
                    username: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return chats
  }

  async addContact(currUser: { id: string; username: string }, username: string): Promise<ResponseDto> {
    const newContact = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!newContact) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    // check if chat already exists
    const isAlreadyContact = await this.prisma.contacts.findFirst({
      where: {
        OR: [
          { AND: [{ userId: currUser.id }, { contactId: newContact.id }] },
          { AND: [{ userId: newContact.id }, { contactId: currUser.id }] },
        ],
      },
    })

    if (isAlreadyContact) {
      throw new HttpException('Chat with this user already exists', HttpStatus.CONFLICT)
    }

    const createContacts = this.prisma.contacts.createMany({
      data: [
        {
          userId: currUser.id,
          contactId: newContact.id,
        },
        {
          contactId: currUser.id,
          userId: newContact.id,
        },
      ],
    })

    // add in contacts and create chat
    const values = await Promise.all([
      await createContacts,
      await this.chatService.createChatContact(`${currUser.username}-${newContact.username}`),
    ])

    const chat = values[1]

    const participants = await this.prisma.participants.createMany({
      data: [
        { chatId: chat.id, userId: currUser.id },
        { chatId: chat.id, userId: newContact.id },
      ],
    })

    return { message: 'ok' }
  }

  async createFolder(currUserId: string, folderName: string) {
    const folder = await this.prisma.folder.create({
      data: {
        name: folderName,
        user: {
          connect: {
            id: currUserId,
          },
        },
      },
    })

    return folder
  }

  async addToFolder(userId: string, folderId: string, contactId: string) {
    return { message: 'not implenemnted' }
  }

  async updateLastSeen(userId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastSeen: new Date(),
      },
    })
  }
}
