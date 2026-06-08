import { io } from 'socket.io-client'

export const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect()
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}
