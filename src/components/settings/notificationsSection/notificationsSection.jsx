import { Box, Paper, Typography, Divider } from '@mui/material'
import { ToggleList } from '../toggleList/toggleList'
import { NOTIFICATION_ITEMS } from '../settings.constants'
import { styles } from './notificationsSection.Styles'

const activityItems = NOTIFICATION_ITEMS.filter((n) => n.group === 'activity')
const emailItems = NOTIFICATION_ITEMS.filter((n) => n.group === 'email')

export function NotificationsSection({ notifications, onToggle }) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Notifications
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Choose what you want to be notified about
      </Typography>
      <Paper elevation={0} sx={styles.card}>
        <ToggleList
          groupLabel="Activity"
          items={activityItems}
          state={notifications}
          onToggle={onToggle}
        />
        <Divider sx={styles.divider} />
        <ToggleList
          groupLabel="Email"
          items={emailItems}
          state={notifications}
          onToggle={onToggle}
        />
      </Paper>
    </Box>
  )
}
