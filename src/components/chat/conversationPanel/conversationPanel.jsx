import { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  CircularProgress,
  Button,
  Tooltip,
} from '@mui/material'
import { Search, Edit, Close, Chat as ChatIcon } from '@mui/icons-material'
import { useChat } from '../../../pages/chat/useChat'
import ConversationItem from '../conversationItem/conversationItem'
import NewChatDialog from '../newChatDialog/newChatDialog'
import * as S from './conversationPanel.Styles'

export default function ConversationPanel({
  conversations,
  activeConversationId,
  onlineUsers,
  isLoading,
  isMobileOpen,
  onSelect,
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [newChatOpen, setNewChatOpen] = useState(false)

  const { startConversation, isStartingConversation } = useChat()

  const filtered = conversations.filter((c) => {
    const name = c.otherUser?.fullName ?? c.otherUser?.userName ?? ''
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleNewChatOpen = () => setNewChatOpen(true)
  const handleNewChatClose = () => setNewChatOpen(false)

  return (
    <>
      <Box sx={S.leftPanel(isMobileOpen)}>
        {/* Header */}
        <Box sx={S.leftPanelHeader}>
          <Typography sx={S.leftPanelTitle}>Chats</Typography>
          <Box sx={S.leftPanelActions}>
            <Tooltip title="New conversation">
              <IconButton sx={S.newChatBtn} onClick={handleNewChatOpen}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Search */}
        <Box sx={S.searchWrapper}>
          <Box sx={S.searchInput}>
            <Search sx={{ color: 'text.disabled', fontSize: 18 }} />
            <InputBase
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations…"
              fullWidth
              sx={{ fontSize: '0.85rem', color: 'text.primary' }}
            />
            {searchQuery && (
              <IconButton size="small" onClick={() => setSearchQuery('')}>
                <Close sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* List */}
        <Box sx={S.convList}>
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          {!isLoading && filtered.length === 0 && (
            <Box sx={S.noConversations}>
              <ChatIcon sx={{ fontSize: 40, opacity: 0.2 }} />
              <Typography variant="body2">
                {searchQuery
                  ? 'No matching conversations'
                  : 'No conversations yet'}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={handleNewChatOpen}
                sx={{ mt: 1 }}
              >
                Start a chat
              </Button>
            </Box>
          )}

          {filtered.map((conv) => (
            <ConversationItem
              key={conv._id}
              conversation={conv}
              isActive={conv._id === activeConversationId}
              isOnline={onlineUsers.has(conv.otherUser?._id)}
              onSelect={onSelect}
            />
          ))}
        </Box>
      </Box>

      <NewChatDialog
        open={newChatOpen}
        onClose={handleNewChatClose}
        onStart={startConversation}
        isLoading={isStartingConversation}
      />
    </>
  )
}
