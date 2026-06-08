import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
} from '@mui/material'
import {
  EditOutlined,
  SaveOutlined,
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
} from '@mui/icons-material'
import { styles } from './accountSection.Styles'

const FIELDS = [
  {
    label: 'Full name',
    key: 'fullName',
    icon: <PersonOutlined fontSize="small" />,
  },
  {
    label: 'Email address',
    key: 'email',
    icon: <EmailOutlined fontSize="small" />,
  },
  {
    label: 'Phone number',
    key: 'phone',
    icon: <PhoneOutlined fontSize="small" />,
  },
]

export function AccountSection({
  profile,
  accountForm,
  editing,
  onFormChange,
  onEdit,
  onSave,
  onChangePassword,
}) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Account
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Manage your personal information
      </Typography>

      <Paper elevation={0} sx={{ ...styles.card, mb: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Avatar
            src={profile?.profileImage?.file?.url || ''}
            sx={styles.avatar}
          >
            {accountForm.fullName?.[0]}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              color="text.primary"
            >
              {accountForm.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{accountForm.username}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 'auto' }}
            startIcon={editing ? <SaveOutlined /> : <EditOutlined />}
            onClick={editing ? onSave : onEdit}
          >
            {editing ? 'Save' : 'Edit'}
          </Button>
        </Stack>

        <Stack spacing={2.5}>
          {FIELDS.map((f) => (
            <TextField
              key={f.key}
              label={f.label}
              fullWidth
              value={accountForm[f.key]}
              onChange={(e) => onFormChange(f.key, e.target.value)}
              disabled={!editing}
              slotProps={{
                input: {
                  startAdornment: <Box sx={styles.iconAdornment}>{f.icon}</Box>,
                },
              }}
            />
          ))}
          <TextField
            label="Username"
            fullWidth
            value={accountForm.username}
            onChange={(e) => onFormChange('username', e.target.value)}
            disabled={!editing}
            slotProps={{
              input: {
                startAdornment: <Typography sx={styles.atSign}>@</Typography>,
              },
            }}
          />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={2}
            value={accountForm.bio}
            onChange={(e) => onFormChange('bio', e.target.value)}
            disabled={!editing}
          />
        </Stack>
      </Paper>

      <Paper elevation={0} sx={styles.card}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.primary"
          mb={2}
        >
          Change Password
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Update your password to keep your account secure.
        </Typography>
        <Button variant="contained" color="primary" onClick={onChangePassword}>
          Change Password
        </Button>
      </Paper>
    </Box>
  )
}
