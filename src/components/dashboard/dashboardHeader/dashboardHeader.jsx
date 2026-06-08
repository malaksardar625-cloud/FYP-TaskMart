import { Stack, Box, Typography } from '@mui/material'
import { styles } from './dashboardHeader.Styles'

export function DashboardHeader({ firstName }) {
  return (
    <Stack direction="row" sx={styles.wrapper}>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          Welcome back, {firstName} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here&apos;s what&apos;s happening on your account today
        </Typography>
      </Box>
    </Stack>
  )
}
