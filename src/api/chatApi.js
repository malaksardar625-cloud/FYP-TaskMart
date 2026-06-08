import { apiClient } from './apiClient'
import { API_BASE } from './apiConfig'

// --------------------
// Conversations
// --------------------
export const getConversations = (navigate) => {
  return apiClient('/chats/conversations', {}, navigate)
}

// --------------------
// Messages
// --------------------
export const getMessages = (conversationId, navigate) => {
  return apiClient(`/chats/${conversationId}/messages`, {}, navigate)
}

// --------------------
// Send message (REST fallback)
// --------------------
export const sendMessageApi = (conversationId, content, navigate) => {
  return apiClient(
    '/chats/messages',
    {
      method: 'POST',
      body: JSON.stringify({
        conversationId,
        content,
      }),
    },
    navigate
  )
}

// --------------------
// Start conversation
// --------------------
export const startConversationApi = (data, navigate) => {
  return apiClient(
    '/chats/start',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    navigate
  )
}
