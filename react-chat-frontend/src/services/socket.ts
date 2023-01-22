import { io, Socket } from 'socket.io-client'

let socket: Socket

export function getSocket() {
  if (!socket) {
    socket = io('http://localhost:5000/chat', {
      transports: ['websocket'],
      autoConnect: false,
    })
  }

  return socket
}
