import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss: Server
  private logger: Logger = new Logger('ChatGateway')

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`client disconnected: ${client.id}`)
  }

  afterInit(server: any) {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string; message: string; room: string }) {
    console.log(message)
    this.wss.to(message.room).emit('chatToClient', message)
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
