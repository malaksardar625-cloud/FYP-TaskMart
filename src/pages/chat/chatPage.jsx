import { useContext } from 'react'
import { Box } from '@mui/material'
import Navbar from '../../components/navbar/navbar'
import { AuthContext } from '../../context/authContext'
import { useChat } from './useChat'
import ConversationPanel from '../../components/chat/conversationPanel/conversationPanel'
import ChatWindowHeader from '../../components/chat/chatWindowHeader/chatWindowHeader'
import MessageList from '../../components/chat/messageList/messageList'
import MessageInputBar from '../../components/chat/messageInputBar/messageInputBar'
import EmptyChatState from '../../components/chat/emptyChatState/emptyChatState'
import * as S from './chatPage.Styles'

export default function ChatPage() {
  const { user } = useContext(AuthContext)

  const {
    conversations,
    messages,
    activeConversation,
    activeConversationId,
    onlineUsers,
    isTypingInActive,
    isMobileConvOpen,
    isConversationsLoading,
    isMessagesLoading,
    isSending,
    messagesEndRef,
    selectConversation,
    handleMobileBack,
    emitTyping,
    sendMessage,
  } = useChat()

  const handleSend = (content) => {
    if (!activeConversationId) return
    sendMessage({ conversationId: activeConversationId, content })
  }

  const isOtherUserOnline = activeConversation?.otherUser?._id
    ? onlineUsers.has(activeConversation.otherUser._id)
    : false

  const showRightPanel = !isMobileConvOpen || activeConversationId

  return (
    <Box>
      <Navbar />

      <Box sx={S.chatRoot}>
        {/* ── Left: Conversation List ── */}
        <ConversationPanel
          conversations={conversations}
          activeConversationId={activeConversationId}
          onlineUsers={onlineUsers}
          isLoading={isConversationsLoading}
          isMobileOpen={isMobileConvOpen}
          onSelect={selectConversation}
        />

        {/* ── Right: Chat Window ── */}
        <Box
          sx={{
            ...S.rightPanel,
            display: { xs: showRightPanel ? 'flex' : 'none', md: 'flex' },
          }}
        >
          {!activeConversationId ? (
            <EmptyChatState />
          ) : (
            <>
              <ChatWindowHeader
                conversation={activeConversation}
                isOnline={isOtherUserOnline}
                onBack={handleMobileBack}
              />

              <MessageList
                messages={messages}
                userId={user?._id ?? user?.id}
                isLoading={isMessagesLoading}
                isTyping={isTypingInActive}
                messagesEndRef={messagesEndRef}
              />

              <MessageInputBar
                onSend={handleSend}
                onTyping={emitTyping}
                disabled={isSending}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
