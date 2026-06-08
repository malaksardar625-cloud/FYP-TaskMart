import { Stack, Box, Typography, IconButton } from '@mui/material'
import { ArrowBackOutlined } from '@mui/icons-material'

export function RolePageHeader({ title, subtitle, onBack }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center" mb={4}>
      <IconButton onClick={onBack} size="small">
        <ArrowBackOutlined fontSize="small" />
      </IconButton>
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Stack>
  )
}
