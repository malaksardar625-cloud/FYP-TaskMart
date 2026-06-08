import {
  Grid,
  Paper,
  Stack,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import { STAT_ICONS } from '../dashboard.constants'
import { styles } from './statsGrid.Styles'

export function StatsGrid({ stats, statsLoading, role }) {
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {statsLoading ? (
        <Grid size={{ xs: 12 }}>
          <Box sx={styles.loadingBox}>
            <CircularProgress size={28} />
          </Box>
        </Grid>
      ) : stats.length === 0 ? (
        <Grid size={{ xs: 12 }}>
          <Alert severity="info" variant="outlined">
            Stats will appear here once your backend returns data from{' '}
            <code>/api/dashboard/stats?role={role}</code>
          </Alert>
        </Grid>
      ) : (
        stats.map((stat) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
            <Paper elevation={0} sx={styles.statCard}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption">{stat.trend}</Typography>
                </Box>
                <Box
                  sx={{
                    ...styles.statIcon,
                    color: stat.color,
                    bgcolor: `${stat.color}15`,
                  }}
                >
                  {STAT_ICONS[stat.label]}
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))
      )}
    </Grid>
  )
}
