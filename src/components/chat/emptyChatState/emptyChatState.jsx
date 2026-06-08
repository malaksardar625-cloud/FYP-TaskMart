import { Box, Typography } from '@mui/material'
import { Chat as ChatIcon } from '@mui/icons-material'
import * as S from './emptyChatState.Styles'

export default function EmptyChatState() {
  return (
    <Box sx={S.emptyState}>
      <Box sx={S.emptyStateIcon}>
        <ChatIcon sx={{ fontSize: 36, color: 'primary.main' }} />
      </Box>
      <Typography variant="h6" fontWeight={700} color="text.primary">
        Your messages
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'center', maxWidth: 280 }}>
        Send private messages to sellers and service providers. Select a
        conversation or start a new one.
      </Typography>
    </Box>
  )
}
