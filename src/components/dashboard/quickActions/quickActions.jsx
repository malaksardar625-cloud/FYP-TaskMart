import { Paper, Grid, Card, CardContent, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ACTION_ICONS } from '../dashboard.constants'
import { styles } from './quickActions.Styles'

export function QuickActions({ actions }) {
  const navigate = useNavigate()

  return (
    <Paper elevation={0} sx={styles.section}>
      <Typography fontWeight={600} sx={{ mb: 2 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={1.5}>
        {actions.map((action) => (
          <Grid size={{ xs: 6 }} key={action.label}>
            <Card
              elevation={0}
              sx={styles.actionCard}
              onClick={() => navigate(action.path)}
            >
              <CardContent>
                <Box sx={styles.actionIcon}>{ACTION_ICONS[action.label]}</Box>
                <Typography variant="caption">{action.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
