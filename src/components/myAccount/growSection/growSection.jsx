import { Box, Paper, Stack, Typography, Button } from '@mui/material'
import { StorefrontOutlined, HandymanOutlined } from '@mui/icons-material'
import { styles } from './growSection.Styles'

export function GrowSection({ onBecomeSeller, onBecomeProvider }) {
  return (
    <>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Grow with TaskMart
      </Typography>
      <Stack spacing={2}>
        <Paper elevation={0} sx={styles.card}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={styles.sellerIcon}>
              <StorefrontOutlined sx={styles.largeIcon} />
            </Box>
            <Box flex={1}>
              <Typography fontWeight={700}>Start Selling Products</Typography>
              <Typography variant="body2" color="text.secondary">
                Create a shop and reach thousands of buyers across Pakistan.
              </Typography>
            </Box>
            <Button variant="contained" onClick={onBecomeSeller}>
              Become Seller
            </Button>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={styles.card}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={styles.providerIcon}>
              <HandymanOutlined sx={styles.largeIcon} />
            </Box>
            <Box flex={1}>
              <Typography fontWeight={700}>Offer Your Services</Typography>
              <Typography variant="body2" color="text.secondary">
                Get hired for your skills by buyers who need expert help.
              </Typography>
            </Box>
            <Button variant="outlined" onClick={onBecomeProvider}>
              Become Provider
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  )
}
