import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'
import { AuthService } from 'src/auth/auth.service'
import { UserService } from 'src/user/user.service'
import { ChatService } from './chat.service'
import { NewMessage } from './types/newMessage.type'

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService, private userService: UserService, private authService: AuthService) {}

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
    const chats = await this.chatService.getChatIdsByUserId(user.id)
    client.join(chats)

    console.log(client.rooms)

    this.userService.updateLastSeen(user.id)
  }

  @SubscribeMessage('send-message-to-server')
  async handleMessage(client: Socket, message: NewMessage) {
    const formatMessage = this.chatService.formatMessage(message)

    this.wss.to(message.chatId).emit('send-message-to-chat', formatMessage)
    await this.chatService.saveMessage(formatMessage)
    this.wss.to(message.chatId).except(client.id).emit('unread-message', { chatId: formatMessage.chatId })

    return 'ok'
  }

  @SubscribeMessage('message-read')
  async handleMessageRead(client: Socket, data: { userId: string; chatId: string }) {
    const handleRead = await this.chatService.updateUnreadCount(data.userId, data.chatId)
 
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
