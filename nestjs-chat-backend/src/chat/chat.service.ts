import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import generateId from 'src/common/generateId'
import { PrismaService } from 'src/prisma/prisma.service'
import { NewMessage } from './types/newMessage.type'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getChatIdsByUserId(userId: string) {
    const chats = await this.prisma.participants.findMany({
      where: {
        userId,
      },
      select: {
        chatId: true,
      },
    })
    const chatIds = chats.map((chat) => chat.chatId)

    return chatIds
  }

  async saveMessage(message) {
    return this.prisma.message.create({
      data: {
        id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        chatId: message.chatId,
        userId: message.userId,
      },
    })
  }

  formatMessage(message: NewMessage) {
    return {
      ...message,
      id: generateId(),
      createdAt: new Date(),
    }
  }
}
