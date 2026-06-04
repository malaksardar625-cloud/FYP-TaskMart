import { Stack, Typography, Rating } from '@mui/material'

export function Stars({ value, count }) {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
      <Rating
        value={value}
        precision={0.1}
        size="small"
        readOnly
        sx={{ color: 'secondary.main' }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({count})
      </Typography>
    </Stack>
  )
}
