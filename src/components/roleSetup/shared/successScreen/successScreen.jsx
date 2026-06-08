import { Box, Paper, Typography, Stack, Button } from '@mui/material'
import { CheckCircleOutlined } from '@mui/icons-material'
import { styles } from './successScreen.Styles'

export function SuccessScreen({
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
}) {
  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Box sx={styles.iconBox}>
          <CheckCircleOutlined sx={styles.icon} />
        </Box>
        <Typography variant="h5" fontWeight={700} color="text.primary" mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {message}
        </Typography>
        <Stack spacing={1.5}>
          <Button variant="contained" fullWidth onClick={onPrimary}>
            {primaryLabel}
          </Button>
          <Button variant="outlined" fullWidth onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
