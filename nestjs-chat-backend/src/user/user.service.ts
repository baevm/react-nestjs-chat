import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, password: string) {
    const user = await this.prisma.user.create({
      data: {
        username,
        password,
      },
    })

    return user
  }

  getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        contacts: {
          select: {
            avatar: true,
            username: true,
            id: true,
          },
        },
        folders: {
          include: {
            contacts: {
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
  }

  async getMessages(userId: string, contactName: string) {
    const contact = await this.prisma.user.findUnique({
      where: {
        username: contactName,
      },
    })

    return this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: contact.id,
          },
          {
            receiverId: userId,
            senderId: contact.id,
          },
        ],
      },
    })
  }

  async addContact(userId: string, username: string) {
    const newContact = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!newContact) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const added = await this.prisma.user.update({
      where: { id: userId },
      data: {
        contacts: {
          connect: {
            username,
          },
        },
      },
    })

    return { message: 'ok' }
  }

  async createFolder(userId: string, folderName: string) {
    const folder = await this.prisma.folder.create({
      data: {
        name: folderName,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return folder
  }

  async addToFolder(userId: string, folderId: string, contactId: string) {
    const folder = await this.prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        contacts: {
          connect: {
            id: contactId,
          },
        },
      },
    })

    return folder
  }
}
