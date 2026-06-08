import { Box, Typography } from '@mui/material'
import * as S from './typingDots.Styles'

export default function TypingDots() {
  return (
    <Box sx={S.typingIndicator}>
      <Box sx={S.typingDots}>
        <Box sx={S.typingDot('0s')} />
        <Box sx={S.typingDot('0.2s')} />
        <Box sx={S.typingDot('0.4s')} />
      </Box>
      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
        typing…
      </Typography>
    </Box>
  )
}
