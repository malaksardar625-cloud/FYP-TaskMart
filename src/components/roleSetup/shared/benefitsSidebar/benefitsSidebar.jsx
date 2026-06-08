import { Box, Paper, Stack, Typography, Divider } from '@mui/material'
import { CheckCircleOutlined } from '@mui/icons-material'
import { styles } from './benefitsSidebar.Styles'

export function BenefitsSidebar({
  title,
  icon,
  iconBgColor,
  benefits,
  termsHref,
  termsLabel,
  children,
}) {
  return (
    <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
      <Paper elevation={0} sx={styles.paper}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
          <Box sx={{ ...styles.iconBox, bgcolor: iconBgColor }}>{icon}</Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {title}
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={1.5}>
          {benefits.map((b) => (
            <Stack key={b} direction="row" spacing={1} alignItems="flex-start">
              <CheckCircleOutlined sx={styles.checkIcon} />
              <Typography variant="body2" color="text.secondary">
                {b}
              </Typography>
            </Stack>
          ))}
        </Stack>

        {/* slot for extras like ProfileStrength */}
        {children}

        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" color="text.secondary">
          By creating a {termsLabel} account you agree to TaskMart's{' '}
          <Typography
            component="a"
            href={termsHref}
            target="_blank"
            variant="caption"
            color="primary.main"
            sx={{ cursor: 'pointer' }}
          >
            {termsLabel} Terms of Service
          </Typography>
          .
        </Typography>
      </Paper>
    </Box>
  )
}
