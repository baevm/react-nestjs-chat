import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer() wss: Server
  private logger: Logger = new Logger('ChatGateway')
  private users = {
    update: function (id, propertiesObject) {
      this[id] = { ...this[id], ...propertiesObject }
    },
  }

  handleConnection(client: Socket) {
    this.logger.log(`client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`)

    for (const key in this.users) {
      if (this.users[key].socketId === client.id) {
        delete this.users[key]
      }
    }
    console.log({ users: this.users })
  }

  afterInit(server: any) {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('user:online')
  handleUserOnline(client: Socket, user: { id: string; username: string }) {
    const isExist = this.users[user.username]

    const userId = user.id

    const connectedUser = {
      socketId: client.id,
      ...user,
    }

    if (isExist) {
      this.users.update(userId, connectedUser)
      console.log({ users: this.users })
      return
    }

    this.users[userId] = connectedUser
    console.log({ users: this.users })
  }

  @SubscribeMessage('user:offline')
  handleUserOffline(client: Socket, user: { id: string; username: string }) {
    for (const key in this.users) {
      if (this.users[key].socketId === client.id) {
        delete this.users[key]
      }
    }
    console.log({ users: this.users })
  }

  @SubscribeMessage('chatToServer')
  handleMessage(
    client: Socket,
    message: { senderId: string; senderName: string; text: string; receiverId: string; receiverName: string }
  ) {
    const formatMessage = this.chatService.formatMessage(message)
    const receiverOnline = this.users[message.receiverId]
    const senderSocketId = this.users[message.senderId].socketId

    this.chatService.saveMessage(formatMessage)
    if (receiverOnline) {
      this.wss.to([receiverOnline.socketId, senderSocketId]).emit('chatToClient', formatMessage)
    } else {
      this.wss.to(senderSocketId).emit('chatToClient', formatMessage)
    }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room)
    client.emit('joinedRoom', room)
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room)
    client.emit('leftRoom', room)
  }
}
