import { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
  Switch,
  Button,
  TextField,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import {
  ArrowBackOutlined,
  PaletteOutlined,
  PersonOutlined,
  NotificationsOutlined,
  LockOutlined,
  DeleteOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  SettingsBrightnessOutlined,
  EditOutlined,
  SaveOutlined,
  EmailOutlined,
  PhoneOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  ShoppingBagOutlined,
  StorefrontOutlined,
  HandymanOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../../context/ThemeContext.jsx'
import { styles } from './Settings.styles.js'

const MOCK_USER = {
  fullName: 'Abdul Qudoos',
  username: 'abdulq',
  email: 'abdulq@example.com',
  phone: '+92 300 1234567',
  role: 'buyer',
  country: 'Pakistan',
  bio: 'Buyer on TaskMart',
}

const ROLE_OPTIONS = [
  {
    value: 'buyer',
    label: 'Buyer',
    desc: 'Browse and purchase',
    icon: <ShoppingBagOutlined />,
  },
  {
    value: 'productSeller',
    label: 'Product Seller',
    desc: 'List and sell products',
    icon: <StorefrontOutlined />,
  },
  {
    value: 'serviceProvider',
    label: 'Service Provider',
    desc: 'Offer services',
    icon: <HandymanOutlined />,
  },
]

const SECTION_NAV = [
  { id: 'appearance', label: 'Appearance', icon: <PaletteOutlined /> },
  { id: 'account', label: 'Account', icon: <PersonOutlined /> },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <NotificationsOutlined />,
  },
  { id: 'privacy', label: 'Privacy', icon: <LockOutlined /> },
  { id: 'danger', label: 'Account Actions', icon: <DeleteOutlined /> },
]

export default function Settings() {
  const navigate = useNavigate()
  const { mode, toggleMode, resolvedMode } = useThemeMode()

  const [activeSection, setActiveSection] = useState('appearance')
  const [themeChoice, setThemeChoice] = useState(mode)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [editingAccount, setEditingAccount] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [accountForm, setAccountForm] = useState({
    fullName: MOCK_USER.fullName,
    username: MOCK_USER.username,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    bio: MOCK_USER.bio,
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMessages: true,
    promotions: false,
    reviews: true,
    systemAlerts: true,
    emailDigest: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPhone: false,
    showEmail: false,
    allowMessages: true,
  })

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity })
  }

  const handleThemeChange = (value) => {
    setThemeChoice(value)
    toggleMode(value)
    showSnackbar('Appearance updated')
  }

  const handleSaveAccount = () => {
    setEditingAccount(false)
    showSnackbar('Account details saved')
  }

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
    showSnackbar('Notification preference updated')
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))
    showSnackbar('Privacy setting updated')
  }

  return (
    <Box sx={styles.root}>
      {/* ── Sidebar ── */}
      <Box sx={styles.sidebar}>
        {/* Back button */}
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
          <IconButton size="small" onClick={() => navigate('/dashboard')}>
            <ArrowBackOutlined fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            Back to Dashboard
          </Typography>
        </Stack>

        <Typography variant="h6" fontWeight={700} color="text.primary" mb={2}>
          Settings
        </Typography>

        {/* Section nav */}
        <Stack spacing={0.5}>
          {SECTION_NAV.map((section) => (
            <Box
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              sx={{
                ...styles.navItem,
                ...(activeSection === section.id ? styles.navItemActive : {}),
              }}
            >
              <Box
                sx={{
                  color:
                    activeSection === section.id
                      ? 'primary.main'
                      : 'text.secondary',
                  display: 'flex',
                }}
              >
                {section.icon}
              </Box>
              <Typography
                variant="body2"
                fontWeight={activeSection === section.id ? 600 : 400}
                color={
                  activeSection === section.id
                    ? 'primary.main'
                    : 'text.secondary'
                }
              >
                {section.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ── Main Content ── */}
      <Box sx={styles.main}>
        {/* ══ APPEARANCE ══ */}
        {activeSection === 'appearance' && (
          <Box>
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
                mb={0.5}
              >
                Appearance
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5 }}
              >
                Customize how TaskMart looks for you
              </Typography>
            </>

            <Paper elevation={0} sx={styles.card}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                mb={2}
              >
                Theme
              </Typography>

              <Stack spacing={1.5}>
                {[
                  {
                    value: 'light',
                    label: 'Light',
                    desc: 'Clean white interface',
                    icon: <LightModeOutlined />,
                  },
                  {
                    value: 'dark',
                    label: 'Dark',
                    desc: 'Easy on the eyes at night',
                    icon: <DarkModeOutlined />,
                  },
                  {
                    value: 'system',
                    label: 'System',
                    desc: 'Follows your device settings',
                    icon: <SettingsBrightnessOutlined />,
                  }, // ← add this
                ].map((option) => (
                  <Box
                    key={option.value}
                    onClick={() => handleThemeChange(option.value)}
                    sx={{
                      ...styles.themeOption,
                      ...(themeChoice === option.value
                        ? styles.themeOptionActive
                        : {}),
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: 'center', flex: 1 }}
                    >
                      <Box
                        sx={{
                          ...styles.themeIcon,
                          color:
                            themeChoice === option.value
                              ? 'primary.main'
                              : 'text.secondary',
                          bgcolor:
                            themeChoice === option.value
                              ? 'primary.light'
                              : 'action.hover',
                        }}
                      >
                        {option.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="text.primary"
                        >
                          {option.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.desc}
                        </Typography>
                      </Box>
                    </Stack>
                    <Radio
                      checked={themeChoice === option.value}
                      onChange={() => handleThemeChange(option.value)}
                      color="primary"
                    />
                  </Box>
                ))}
              </Stack>

              {/* Preview box */}
              <Box sx={styles.previewBox}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  {themeChoice === 'dark' ? (
                    <DarkModeOutlined
                      sx={{ color: 'primary.main', fontSize: 18 }}
                    />
                  ) : (
                    <LightModeOutlined
                      sx={{ color: 'warning.main', fontSize: 18 }}
                    />
                  )}
                  <Typography variant="caption" color="text.secondary">
                    Currently using <strong>{themeChoice}</strong> mode
                    {themeChoice === 'system' && ` (${resolvedMode})`}{' '}
                    {/* shows e.g. "system (dark)" */}
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Box>
        )}

        {/* ══ ACCOUNT ══ */}
        {activeSection === 'account' && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Manage your personal information
            </Typography>

            {/* Profile card */}
            <Paper elevation={0} sx={{ ...styles.card, mb: 2.5 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'center', mb: 3 }}
              >
                <Avatar sx={styles.profileAvatar}>
                  {MOCK_USER.fullName[0]}
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
                  startIcon={
                    editingAccount ? <SaveOutlined /> : <EditOutlined />
                  }
                  onClick={
                    editingAccount
                      ? handleSaveAccount
                      : () => setEditingAccount(true)
                  }
                  sx={{ ml: 'auto' }}
                >
                  {editingAccount ? 'Save' : 'Edit'}
                </Button>
              </Stack>

              <Stack spacing={2.5}>
                <TextField
                  label="Full name"
                  fullWidth
                  value={accountForm.fullName}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, fullName: e.target.value }))
                  }
                  disabled={!editingAccount}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <Box
                          sx={{
                            mr: 1,
                            display: 'flex',
                            color: 'text.secondary',
                          }}
                        >
                          <PersonOutlined fontSize="small" />
                        </Box>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Username"
                  fullWidth
                  value={accountForm.username}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, username: e.target.value }))
                  }
                  disabled={!editingAccount}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <Typography
                          sx={{
                            mr: 0.5,
                            color: 'text.secondary',
                            fontSize: 14,
                          }}
                        >
                          @
                        </Typography>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Email address"
                  fullWidth
                  value={accountForm.email}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, email: e.target.value }))
                  }
                  disabled={!editingAccount}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <Box
                          sx={{
                            mr: 1,
                            display: 'flex',
                            color: 'text.secondary',
                          }}
                        >
                          <EmailOutlined fontSize="small" />
                        </Box>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Phone number"
                  fullWidth
                  value={accountForm.phone}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  disabled={!editingAccount}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <Box
                          sx={{
                            mr: 1,
                            display: 'flex',
                            color: 'text.secondary',
                          }}
                        >
                          <PhoneOutlined fontSize="small" />
                        </Box>
                      ),
                    },
                  }}
                />
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  rows={2}
                  value={accountForm.bio}
                  onChange={(e) =>
                    setAccountForm((p) => ({ ...p, bio: e.target.value }))
                  }
                  disabled={!editingAccount}
                />
              </Stack>
            </Paper>

            {/* Change password */}
            <Paper elevation={0} sx={styles.card}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                mb={2}
              >
                Change Password
              </Typography>
              <Stack spacing={2.5}>
                <TextField
                  label="Current password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          size="small"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? (
                            <VisibilityOffOutlined fontSize="small" />
                          ) : (
                            <VisibilityOutlined fontSize="small" />
                          )}
                        </IconButton>
                      ),
                    },
                  }}
                />
                <TextField label="New password" type="password" fullWidth />
                <TextField label="Confirm password" type="password" fullWidth />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Update Password
                </Button>
              </Stack>
            </Paper>
          </Box>
        )}

        {/* ══ NOTIFICATIONS ══ */}
        {activeSection === 'notifications' && (
          <Box>
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
                mb={0.5}
              >
                Notifications
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5 }}
              >
                Choose what you want to be notified about
              </Typography>
            </>

            <Paper elevation={0} sx={styles.card}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontSize: '0.7rem',
                }}
              >
                Activity
              </Typography>
              <List disablePadding>
                {[
                  {
                    key: 'orderUpdates',
                    label: 'Order updates',
                    desc: 'Get notified when your order status changes',
                  },
                  {
                    key: 'newMessages',
                    label: 'New messages',
                    desc: 'Receive alerts for incoming chat messages',
                  },
                  {
                    key: 'reviews',
                    label: 'Reviews',
                    desc: 'When someone leaves a review on your listing',
                  },
                  {
                    key: 'systemAlerts',
                    label: 'System alerts',
                    desc: 'Important platform announcements and updates',
                  },
                ].map((item, index, arr) => (
                  <Box key={item.key}>
                    <ListItem disablePadding sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            color="text.primary"
                          >
                            {item.label}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {item.desc}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications[item.key]}
                          onChange={() => handleNotificationToggle(item.key)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < arr.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                  fontSize: '0.7rem',
                }}
              >
                Email
              </Typography>
              <List disablePadding>
                {[
                  {
                    key: 'promotions',
                    label: 'Promotions',
                    desc: 'Deals, discounts and special offers',
                  },
                  {
                    key: 'emailDigest',
                    label: 'Weekly digest',
                    desc: 'A summary of activity sent every Monday',
                  },
                ].map((item, index, arr) => (
                  <Box key={item.key}>
                    <ListItem disablePadding sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            color="text.primary"
                          >
                            {item.label}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {item.desc}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={notifications[item.key]}
                          onChange={() => handleNotificationToggle(item.key)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < arr.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* ══ PRIVACY ══ */}
        {activeSection === 'privacy' && (
          <Box>
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
                mb={0.5}
              >
                Privacy
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5 }}
              >
                Control your visibility and data sharing
              </Typography>
            </>

            <Paper elevation={0} sx={styles.card}>
              <List disablePadding>
                {[
                  {
                    key: 'profileVisible',
                    label: 'Public profile',
                    desc: 'Let others find and view your profile',
                  },
                  {
                    key: 'showPhone',
                    label: 'Show phone number',
                    desc: 'Display your phone on your public profile',
                  },
                  {
                    key: 'showEmail',
                    label: 'Show email',
                    desc: 'Display your email on your public profile',
                  },
                  {
                    key: 'allowMessages',
                    label: 'Allow messages',
                    desc: 'Let other users send you direct messages',
                  },
                ].map((item, index, arr) => (
                  <Box key={item.key}>
                    <ListItem disablePadding sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            color="text.primary"
                          >
                            {item.label}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            {item.desc}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={privacy[item.key]}
                          onChange={() => handlePrivacyToggle(item.key)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < arr.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* ══ Account Actions ══ */}
        {activeSection === 'danger' && (
          <Box>
            <>
              <Typography
                variant="h5"
                fontWeight={700}
                color="text.primary"
                mb={0.5}
              >
                Account Actions
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1.5 }}
              >
                Irreversible actions — proceed with caution
              </Typography>
            </>

            <Paper
              elevation={0}
              sx={{
                ...styles.card,
                border: '1px solid',
                borderColor: 'error.main',
              }}
            >
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    Temporarily disable your account. You can reactivate it
                    anytime by logging back in.
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1.5 }}
                  >
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
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
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
