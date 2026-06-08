import {
  Paper,
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
} from '@mui/material'
import { CheckCircleOutlined } from '@mui/icons-material'
import { styles } from './profileCompletion.Styles'

export function ProfileCompletion({ profileSteps, pct, onComplete }) {
  return (
    <Paper elevation={0} sx={styles.section}>
      <Typography fontWeight={600}>Profile Completion</Typography>
      <Typography variant="caption" color="text.secondary">
        Complete your profile to build trust
      </Typography>
      <Box sx={{ mt: 2 }}>
        <LinearProgress variant="determinate" value={pct} />
        <Typography variant="caption" sx={{ mt: 1 }}>
          {pct}% Complete
        </Typography>
        <Stack spacing={1} sx={{ mt: 2 }}>
          {profileSteps.map((step) => (
            <Stack key={step.label} direction="row" gap={1} alignItems="center">
              <CheckCircleOutlined
                sx={step.done ? styles.doneIcon : styles.pendingIcon}
              />
              <Typography variant="caption">{step.label}</Typography>
            </Stack>
          ))}
        </Stack>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={onComplete}
        >
          Complete Profile
        </Button>
      </Box>
    </Paper>
  )
}
