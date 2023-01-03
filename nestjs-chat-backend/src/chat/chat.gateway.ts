import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server
  private logger: Logger = new Logger('ChatGateway')
  private users = []

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`)
    this.users = this.users.filter((u) => u.socketId === client.id)
    console.log({ users: this.users })
  }

  afterInit(server: any) {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('user:online')
  handleUserOnline(client: Socket, user: { id: string; username: string }) {
    const isExist = this.users.find((u) => u.id === user.id)

    if (isExist) {
      isExist.socketId = client.id
      console.log({ users: this.users })
      return
    }

    const connectedUser = {
      socketId: client.id,
      ...user,
    }
    this.users.push(connectedUser)
    console.log({ users: this.users })
  }

  @SubscribeMessage('user:offline')
  handleUserOffline(client: Socket, user: { id: string; username: string }) {
    this.users = this.users.filter((u) => u.id === user.id)
    console.log({ users: this.users })
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string; message: string; room: string }) {
    console.log(message)
    this.wss/* .to(message.room) */.emit('chatToClient', message)
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
