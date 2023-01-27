import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CurrUser } from 'src/common/decorators/get-current-user.decorator'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

    return user
  }

  async getChats(userId: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },
      include: {
        messages: true,
        participants: {
          select: {
            unreadCount: true,
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
    })

    return chats
  }

  async addContact(currUser: CurrUser, username: string) {
    const newContact = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!newContact) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    // check if chat already exists

    const chat = await this.prisma.chat.create({
      data: {
        id: generateId('C'),
        title: `${currUser.username}-${newContact.username}`,
        type: 'contact',
      },
    })

    const participants = await this.prisma.participants.createMany({
      data: [
        { chatId: chat.id, userId: currUser.sub },
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
    /* const folder = await this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
       
      },
    })

    return folder */
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
