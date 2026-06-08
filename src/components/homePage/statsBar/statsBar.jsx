import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useCountUp } from '../../../hooks/useCountUp'
import { useResponsive } from '../../../hooks/useResponsive'
import { statsBar, statItem } from '../statsBar/statsBar.Styles'

const STATS = [
  { label: 'Active Users', end: 50, suffix: 'K+' },
  { label: 'Products Listed', end: 120, suffix: 'K+' },
  { label: 'Service Providers', end: 8, suffix: 'K+' },
  { label: 'Orders Completed', end: 200, suffix: 'K+' },
]

function StatItem({ stat }) {
  const count = useCountUp(stat.end)
  const { isWatch } = useResponsive()
  const theme = useTheme()

  return (
    <Box sx={statItem}>
      <Typography
        variant={isWatch ? 'h6' : 'h4'}
        sx={{
          fontWeight: 800,
          color: theme.palette.primary.contrastText,
          lineHeight: 1,
        }}
      >
        {count}
        {stat.suffix}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.primary.contrastText,
          opacity: 0.72,
          display: 'block',
          mt: 0.4,
        }}
      >
        {stat.label}
      </Typography>
    </Box>
  )
}

export default function StatsBar() {
  const theme = useTheme()

  return (
    <Box sx={statsBar(theme)}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </Box>
    </Box>
  )
}
