import { Injectable } from '@nestjs/common'
import { Message } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { nanoid } from 'nanoid'

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  formatMessage(message: { senderId: string; receiverId: string; text: string }): Message {
    return {
      ...message,
      id: nanoid(11),
      createdAt: new Date(),
    }
  }

  async saveMessage(message: Message) {
    return this.prisma.message.create({ data: message })
  }
}
