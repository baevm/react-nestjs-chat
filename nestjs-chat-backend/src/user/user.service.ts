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
