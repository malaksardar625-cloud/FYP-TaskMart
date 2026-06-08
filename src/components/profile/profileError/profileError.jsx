import { Box, Alert } from '@mui/material'
import Navbar from '../../navbar/navbar'

export function ProfileError() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
        <Alert severity="error">
          Failed to load profile. Please try again.
        </Alert>
      </Box>
    </Box>
  )
}
