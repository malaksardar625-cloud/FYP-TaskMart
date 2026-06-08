import { Stack, Box, Typography } from '@mui/material'
import { styles } from './setupBrand.Styles'

export function SetupBrand() {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={styles.logoMark} />
      <Typography variant="h6" fontWeight={700}>
        TaskMart
      </Typography>
    </Stack>
  )
}
