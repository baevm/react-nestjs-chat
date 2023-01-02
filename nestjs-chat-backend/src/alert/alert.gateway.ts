import { Logger } from '@nestjs/common/services'
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { OnGatewayInit } from '@nestjs/websockets/interfaces'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway {
  @WebSocketServer() wss: Server
  private logger: Logger = new Logger('AlertGateway')

  sentToAll(message: string) {
    this.wss.emit('alertToClient', { type: 'Alert', message })
  }
}
