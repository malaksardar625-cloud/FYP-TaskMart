import {
  Paper,
  Stack,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
} from '@mui/material'
import {
  CheckCircleOutlined,
  EditOutlined,
  ArrowForwardOutlined,
} from '@mui/icons-material'
import { styles } from './roleCard.Styles'

export function RoleCard({
  icon,
  title,
  description,
  active,
  profile,
  approvedLabel,
  pendingLabel,
  features,
  renderProfile,
  manageLabel,
  onManage,
  onGetStarted,
}) {
  return (
    <Paper
      elevation={0}
      sx={{ ...styles.paper, borderColor: active ? 'success.main' : 'divider' }}
    >
      <Box
        sx={{
          ...styles.accentBar,
          bgcolor: active ? 'success.main' : 'primary.main',
        }}
      />

      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            ...styles.iconBox,
            bgcolor: active ? 'success.light' : 'primary.light',
            color: active ? 'success.main' : 'primary.main',
          }}
        >
          {icon}
        </Box>

        <Box flex={1}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="text.primary"
            >
              {title}
            </Typography>
            {active && (
              <Chip
                icon={<CheckCircleOutlined sx={{ fontSize: 14 }} />}
                label={profile?.isApproved ? approvedLabel : pendingLabel}
                color={profile?.isApproved ? 'success' : 'warning'}
                size="small"
                sx={styles.statusChip}
              />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" mb={1.5}>
            {description}
          </Typography>

          {active ? (
            <Box>
              <Divider sx={{ mb: 1.5 }} />
              {renderProfile(profile)}
              <Button
                variant="outlined"
                size="small"
                startIcon={<EditOutlined />}
                onClick={onManage}
                sx={{ mt: 2 }}
              >
                {manageLabel}
              </Button>
            </Box>
          ) : (
            <Stack direction="row" spacing={1.5} flexWrap="wrap">
              {features.map((f) => (
                <Stack
                  key={f}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
                  <CheckCircleOutlined sx={styles.featureCheck} />
                  <Typography variant="caption" color="text.secondary">
                    {f}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>

        {!active && (
          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowForwardOutlined />}
            onClick={onGetStarted}
            sx={{ flexShrink: 0 }}
          >
            Get Started
          </Button>
        )}
      </Stack>
    </Paper>
  )
}
