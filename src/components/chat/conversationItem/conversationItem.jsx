import { Box, Avatar, Typography } from '@mui/material'
import {
  getInitials,
  formatConversationTime,
  truncate,
} from '../../../pages/chat/chat.utils'
import * as S from './conversationItem.Styles'

export default function ConversationItem({
  conversation,
  isActive,
  isOnline,
  onSelect,
}) {
  const otherUser = conversation?.otherUser ?? {}
  const name = otherUser.fullName ?? otherUser.userName ?? 'Unknown'
  const initials = getInitials(name)
  const hasUnread = (conversation.unreadCount ?? 0) > 0

  return (
    <Box sx={S.convItem(isActive)} onClick={() => onSelect(conversation._id)}>
      <Box sx={S.avatarWrapper}>
        <Avatar
          src={otherUser.profileImage?.file?.url ?? undefined}
          sx={S.convAvatar(isActive)}
        >
          {initials}
        </Avatar>
        {isOnline && <Box sx={S.onlineDot} />}
      </Box>

      <Box sx={S.convItemContent}>
        <Box sx={S.convItemTopRow}>
          <Typography sx={S.convName(hasUnread)}>{name}</Typography>
          <Typography sx={S.convTime(hasUnread)}>
            {formatConversationTime(conversation.lastMessage?.createdAt)}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={S.convLastMsg(hasUnread)}>
            {truncate(
              conversation.lastMessage?.content ?? 'No messages yet',
              42
            )}
          </Typography>
          {hasUnread && (
            <Box sx={S.convUnreadBadge}>
              {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
