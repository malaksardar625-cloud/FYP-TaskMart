import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Alert,
  Divider,
} from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { styles } from './dangerSection.Styles'

export function DangerSection() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Account Actions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Irreversible actions — proceed with caution
      </Typography>
      <Paper elevation={0} sx={styles.card}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
              mb={0.5}
            >
              Deactivate account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Temporarily disable your account. You can reactivate it anytime by
              logging back in.
            </Typography>
            <Button variant="outlined" color="warning" size="small">
              Deactivate Account
            </Button>
          </Box>
          <Divider />
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="error.main"
              mb={0.5}
            >
              Delete account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </Typography>
            <Alert severity="error" sx={{ mb: 2 }}>
              Deleting your account will remove all your listings, orders,
              messages and reviews permanently.
            </Alert>
            <Button
              variant="contained"
              color="error"
              size="small"
              startIcon={<DeleteOutlined />}
            >
              Delete My Account
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
