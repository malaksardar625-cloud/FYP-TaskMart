import { Box, CircularProgress } from '@mui/material'
import {
  groupMessagesByDate,
  formatDateDivider,
} from '../../../pages/chat/chat.utils'
import DateDivider from '../dateDivider/dateDivider'
import MessageBubble from '../messageBubble/messageBubble'
import TypingDots from '../typingDots/typingDots'
import * as S from './messageList.Styles'

export default function MessageList({
  messages,
  userId,
  isLoading,
  isTyping,
  messagesEndRef,
}) {
  if (isLoading) {
    return (
      <Box sx={S.loadingWrapper}>
        <CircularProgress size={28} />
      </Box>
    )
  }

  const groups = groupMessagesByDate(messages)

  return (
    <Box sx={S.messageArea}>
      {groups.map((group, gi) => (
        <Box key={gi}>
          <DateDivider label={formatDateDivider(group.date)} />
          {group.messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isMine={msg.sender?._id === userId || msg.sender === userId}
            />
          ))}
        </Box>
      ))}

      {isTyping && <TypingDots />}
      <Box ref={messagesEndRef} />
    </Box>
  )
}
