import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'
import { UserService } from 'src/user/user.service'
import { ChatService } from './chat.service'
import { NewMessage } from './types/newMessage.type'

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() wss: Server
  private logger: Logger = new Logger('ChatGateway')

  handleConnection(client: Socket) {
    this.logger.log(`client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`)
  }

  afterInit() {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('user-online')
  async handleUserOnline(client: Socket, user: { id: string; username: string }) {
    const chatIds = await this.chatService.getChatIdsByUserId(user.id)
    chatIds.forEach((id) => client.join(id))

    
  }

  @SubscribeMessage('send-message-to-server')
  handleMessage(client: Socket, message: NewMessage) {
    const formatMessage = this.chatService.formatMessage(message)

    this.chatService.saveMessage(formatMessage)

    this.wss.to(message.chatId).emit('send-message-to-chat', formatMessage)

    return 'ok'
  }

  @SubscribeMessage('join-group')
  handleJoinRoom(client: Socket, chatId: string) {
    //
  }

  @SubscribeMessage('leave-group')
  handleLeaveRoom(client: Socket, chatId: string) {
    //
  }
}
