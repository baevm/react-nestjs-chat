import useUser from '@hooks/useUser'
import { isServer } from '@utils/isServer'
import React, { createContext, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const socket = io('http://localhost:5000/chat', {
  transports: ['websocket'],
  autoConnect: false,
})
const SocketContext = createContext<Socket>(socket)

/* socket.on('connect', () => console.log('connected to socket'))
 */
const SocketProvider = ({ children }: any) => {
  const { user, error, isError, isLoading } = useUser()

  useEffect(() => {
    if (user && !isServer) {
      socket.connect()
      socket.on('connect', () => {
        socket.emit('user:online', { username: user.username, id: user.id })
      })
    }

    return () => {
      if (user) {
        socket.disconnect()
        socket.emit('user:offline', { username: user.username, id: user.id })
      }
    }
  }, [user])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
export { SocketContext, SocketProvider }
