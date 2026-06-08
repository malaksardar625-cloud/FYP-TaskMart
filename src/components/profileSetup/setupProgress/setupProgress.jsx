import { Box, Typography, LinearProgress } from '@mui/material'
import { styles } from './setupProgress.Styles'

export function SetupProgress({ step, total, pct }) {
  return (
    <>
      <Box sx={styles.row}>
        <Typography variant="caption" color="text.secondary">
          Step {step} of {total} — Set up your profile
        </Typography>
        <Typography variant="caption" color="primary" fontWeight={600}>
          {pct}%
        </Typography>
      </Box>
      <Box sx={styles.wrapper}>
        <LinearProgress variant="determinate" value={pct} sx={styles.bar} />
      </Box>
    </>
  )
}
