// ── Message status enum ──────────────────────────────────────
export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
}

// ── Socket.io event names ────────────────────────────────────
export const SOCKET_EVENTS = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
  TYPING: 'typing',
  STOP_TYPING: 'stop_typing',
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  MARK_READ: 'mark_read',
  MESSAGE_READ: 'message_read',
}

// ── Timing constants ─────────────────────────────────────────
export const TYPING_TIMEOUT_MS = 2500
export const MESSAGES_PAGE_SIZE = 30
export const SCROLL_THRESHOLD_PX = 100

// ── API route fragments ───────────────────────────────────────
export const CHAT_API = {
  CONVERSATIONS: '/chat/conversations',
  MESSAGES: (conversationId) =>
    `/chat/conversations/${conversationId}/messages`,
  START: '/chat/conversations',
  MARK_READ: (conversationId) => `/chat/conversations/${conversationId}/read`,
}
