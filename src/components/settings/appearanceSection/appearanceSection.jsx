import { Box, Paper, Typography, Stack, Radio } from '@mui/material'
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { THEME_OPTIONS } from '../settings.constants'
import { styles } from './appearanceSection.styles'

export function AppearanceSection({
  themeChoice,
  resolvedMode,
  onThemeChange,
}) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Appearance
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Customize how TaskMart looks for you
      </Typography>
      <Paper elevation={0} sx={styles.card}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.primary"
          mb={2}
        >
          Theme
        </Typography>
        <Stack spacing={1.5}>
          {THEME_OPTIONS.map((option) => (
            <Box
              key={option.value}
              onClick={() => onThemeChange(option.value)}
              sx={{
                ...styles.themeOption,
                ...(themeChoice === option.value
                  ? styles.themeOptionActive
                  : {}),
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                <Box
                  sx={{
                    ...styles.themeIcon,
                    color:
                      themeChoice === option.value
                        ? 'primary.main'
                        : 'text.secondary',
                    bgcolor:
                      themeChoice === option.value
                        ? 'primary.light'
                        : 'action.hover',
                  }}
                >
                  {option.icon}
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color="text.primary"
                  >
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.desc}
                  </Typography>
                </Box>
              </Stack>
              <Radio
                checked={themeChoice === option.value}
                onChange={() => onThemeChange(option.value)}
                color="primary"
              />
            </Box>
          ))}
        </Stack>
        <Box sx={styles.previewBox}>
          <Stack direction="row" spacing={1} alignItems="center">
            {themeChoice === 'dark' ? (
              <DarkModeOutlined sx={{ color: 'primary.main', fontSize: 18 }} />
            ) : (
              <LightModeOutlined sx={{ color: 'warning.main', fontSize: 18 }} />
            )}
            <Typography variant="caption" color="text.secondary">
              Currently using <strong>{themeChoice}</strong> mode
              {themeChoice === 'system' && ` (${resolvedMode})`}
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}
