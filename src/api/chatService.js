import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";
export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // We will connect manually when the user logs in
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
