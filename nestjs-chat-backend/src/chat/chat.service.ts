import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'
import { NewMessage } from './types/newMessage.type'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  formatMessage(message: NewMessage): Prisma.MessageCreateArgs['data'] {
    return {
      ...message,
      id: generateId(),
      createdAt: new Date(),
    }
  }

  async saveMessage(message: Prisma.MessageCreateArgs['data']) {
    return this.prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        receiverId: message.receiverId,
        senderId: message.senderId,
        groupId: message.groupId,
      },
    })
  }
}
