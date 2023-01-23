import { serverUrl } from 'constants/serverUrl'
import { io, Socket } from 'socket.io-client'

let socket: Socket

export function getSocket() {
  if (!socket) {
    socket = io(`${serverUrl}/chat`, {
      transports: ['websocket'],
      autoConnect: false,
    })
  }

  return socket
}
