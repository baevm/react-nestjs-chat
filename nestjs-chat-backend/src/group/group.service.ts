import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import generateId from 'src/common/helpers/generateId'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async createGroup(userId: string, groupName: string) {
    const group = await this.prisma.chat.create({
      data: {
        id: generateId('G'),
        title: groupName,
        type: 'group',
      },
    })

    const participants = await this.prisma.participants.create({
      data: {
        chatId: group.id,
        userId,
      },
    })

    return group
  }

  async inviteToGroup(groupId: string, username: string) {
    const newUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!newUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.participants.create({
      data: {
        userId: newUser.id,
        chatId: groupId,
      },
    })
  }

  async removeFromGroup(groupId: string, username: string) {
    const removeUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    })

    return this.prisma.chat.update({
      where: {
        id: groupId,
      },
      data: {
        participants: {
          disconnect: {
            id: removeUser.id,
          },
        },
      },
    })
  }
}
