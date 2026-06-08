import { Box, Paper, Typography } from '@mui/material'
import { ToggleList } from '../toggleList/toggleList'
import { PRIVACY_ITEMS } from '../settings.constants'
import { styles } from './privacySection.Styles'

export function PrivacySection({ privacy, onToggle }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Privacy
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Control your visibility and data sharing
      </Typography>
      <Paper elevation={0} sx={styles.card}>
        <ToggleList items={PRIVACY_ITEMS} state={privacy} onToggle={onToggle} />
      </Paper>
    </Box>
  )
}
