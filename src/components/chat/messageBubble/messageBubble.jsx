import { Box, Typography } from '@mui/material'
import { DoneAll, Done } from '@mui/icons-material'
import { formatMessageTime } from '../../../pages/chat/chat.utils'
import * as S from './messageBubble.Styles'

function StatusIcon({ isMine, status }) {
  if (!isMine) return null

  if (status === 'read')
    return <DoneAll sx={{ ...S.messageStatusIcon, color: '#53bdeb' }} />
  if (status === 'delivered') return <DoneAll sx={S.messageStatusIcon} />
  if (status === 'sending')
    return <Done sx={{ ...S.messageStatusIcon, opacity: 0.5 }} />

  return <Done sx={S.messageStatusIcon} />
}

export default function MessageBubble({ message, isMine }) {
  return (
    <Box sx={S.messageBubbleRow(isMine)}>
      <Box sx={S.messageBubble(isMine)}>
        <Typography sx={S.messageText}>{message.content}</Typography>
        <Box sx={S.messageMeta(isMine)}>
          <Typography sx={S.messageTime(isMine)}>
            {formatMessageTime(message.createdAt)}
          </Typography>
          <StatusIcon isMine={isMine} status={message.status} />
        </Box>
      </Box>
    </Box>
  )
}
