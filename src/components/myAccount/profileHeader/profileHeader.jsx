import {
  Box,
  Paper,
  Stack,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@mui/material'
import { styles } from './profileHeader.Styles'

export function ProfileHeader({ user, onEdit }) {
  return (
    <Paper elevation={0} sx={styles.paper}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={user?.profileImageUrl} sx={styles.avatar}>
          {user?.fullName?.[0]}
        </Avatar>
        <Box flex={1}>
          <Typography variant="h5" fontWeight={700}>
            {user?.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
          <Chip label="Buyer" size="small" color="primary" sx={styles.chip} />
        </Box>
        <Button variant="outlined" onClick={onEdit}>
          Edit Profile
        </Button>
      </Stack>
    </Paper>
  )
}
