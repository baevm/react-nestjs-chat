import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
        AND: [
          {
            senderId: userId,
          },
          {
            receiverId: contact.id,
          }
        ]
      }
    })

   /*  return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        sender: {
          where: {
            senderId: userId,
          },
        },
        receiver: {
          where: {
            receiverId: contact.id,
          },
        },
      },
    }) */
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
}
