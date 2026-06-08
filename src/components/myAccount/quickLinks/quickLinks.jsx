import { Grid, Paper, Box, Typography } from '@mui/material'
import { styles } from './quickLinks.Styles'

export function QuickLinks({ links, onNavigate }) {
  return (
    <Grid container spacing={2} mb={3}>
      {links.map((link) => (
        <Grid item xs={6} sm={4} key={link.label}>
          <Paper
            elevation={0}
            onClick={() => onNavigate(link.path)}
            sx={styles.card}
          >
            <Box sx={styles.icon}>{link.icon}</Box>
            <Typography variant="body2" fontWeight={600}>
              {link.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
