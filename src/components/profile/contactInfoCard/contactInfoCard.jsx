import { Paper, Stack, Box, Typography, Button, Divider } from '@mui/material'
import { EmailOutlined, PhoneOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from './contactInfoCard.Styles'

export function ContactInfoCard({ email, phone }) {
  const navigate = useNavigate()

  return (
    <Paper elevation={0} sx={styles.paper}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          Contact Info
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate('/settings')}
        >
          Edit in Settings
        </Button>
      </Stack>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <EmailOutlined sx={styles.icon} />
          <Box>
            <Typography variant="caption" color="text.disabled" display="block">
              Email
            </Typography>
            <Typography variant="body2" color="text.primary">
              {email || '—'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PhoneOutlined sx={styles.icon} />
          <Box>
            <Typography variant="caption" color="text.disabled" display="block">
              Phone
            </Typography>
            <Typography variant="body2" color="text.primary">
              {phone || '—'}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}
