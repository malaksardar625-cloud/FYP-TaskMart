import { useState, useEffect, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  Radio,
  Chip,
  CircularProgress,
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
  ShoppingBagOutlined,
  StorefrontOutlined,
  HandymanOutlined,
  CheckCircleOutlined,
  ArrowForwardOutlined,
  BadgeOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../../context/themeContext.js'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext.js'
import { styles } from './settings.styles.js'

const api = async (url) => {
  const res = await fetch(`http://localhost:5000${url}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

const SECTION_NAV = [
  { id: 'appearance', label: 'Appearance', icon: <PaletteOutlined /> },
  { id: 'account', label: 'Account', icon: <PersonOutlined /> },
  { id: 'roles', label: 'Roles', icon: <BadgeOutlined /> },
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
  useContext(AuthContext)

  const { data: authUser } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api('/api/profile/base/byUser'),
  })

  const profile = authUser?.data || authUser

  const [activeSection, setActiveSection] = useState('appearance')
  const [themeChoice, setThemeChoice] = useState(mode)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const [editingAccount, setEditingAccount] = useState(false)
  const [accountForm, setAccountForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
  })

  useEffect(() => {
    if (profile) {
      setAccountForm({
        fullName: profile?.fullName || '',
        username: profile?.user?.userName || '',
        email: profile?.user?.email || '',
        phone: profile?.phone || '',
        bio: profile?.bio || '',
      })
    }
  }, [profile])

  // ── Fetch real profile from backend ──────────────────────────

  // ── Roles state ──────────────────────────────────────────────
  const [sellerProfile, setSellerProfile] = useState(null)
  const [providerProfile, setProviderProfile] = useState(null)
  const [rolesLoading, setRolesLoading] = useState(false)

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

  // ── Helpers ───────────────────────────────────────────────────
  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  // ── Fetch role profiles ───────────────────────────────────────
  const fetchRoleProfiles = useCallback(async () => {
    if (!profile?._id) return
    setRolesLoading(true)
    try {
      const [sellerRes, providerRes] = await Promise.allSettled([
        fetch(`http://localhost:5000/api/sellers/me`, {
          credentials: 'include',
        }),
        fetch(`http://localhost:5000/api/providers?user=${profile?._id}`, {
          credentials: 'include',
        }),
      ])

      if (sellerRes.status === 'fulfilled' && sellerRes.value.ok) {
        const data = await sellerRes.value.json()
        setSellerProfile(data?.data || data || null)
      }
      if (providerRes.status === 'fulfilled' && providerRes.value.ok) {
        const data = await providerRes.value.json()
        setProviderProfile(data?.data || data || null)
      }
    } catch {
      /* profiles simply not found — leave null */
    } finally {
      setRolesLoading(false)
    }
  }, [profile?._id])
  useEffect(() => {
    if (activeSection === 'roles') fetchRoleProfiles()
  }, [activeSection, fetchRoleProfiles])

  // ── Theme ─────────────────────────────────────────────────────
  const handleThemeChange = (value) => {
    setThemeChoice(value)
    toggleMode(value)
    showSnackbar('Appearance updated')
  }

  // ── Account ───────────────────────────────────────────────────
  const handleSaveAccount = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/base`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(accountForm),
      })
      if (!res.ok) throw new Error()
      setEditingAccount(false)
      showSnackbar('Account details saved')
    } catch {
      showSnackbar('Failed to save account details', 'error')
    }
  }

  const handleNotificationToggle = (key) => {
    setNotifications((p) => ({ ...p, [key]: !p[key] }))
    showSnackbar('Notification preference updated')
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy((p) => ({ ...p, [key]: !p[key] }))
    showSnackbar('Privacy setting updated')
  }

  // ─────────────────────────────────────────────────────────────
  return (
    <Box sx={styles.root}>
      {/* ── Sidebar ── */}
      <Box sx={styles.sidebar}>
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
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Appearance
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Customize how TaskMart looks for you
            </Typography>

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
                  },
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
                    {themeChoice === 'system' && ` (${resolvedMode})`}
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

            <Paper elevation={0} sx={{ ...styles.card, mb: 2.5 }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: 'center', mb: 3 }}
              >
                <Avatar
                  src={profile?.profileImage?.file?.url || ''}
                  sx={styles.profileAvatar}
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
                {[
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
                ].map((f) => (
                  <TextField
                    key={f.key}
                    label={f.label}
                    fullWidth
                    value={accountForm[f.key]}
                    onChange={(e) =>
                      setAccountForm((p) => ({ ...p, [f.key]: e.target.value }))
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
                            {f.icon}
                          </Box>
                        ),
                      },
                    }}
                  />
                ))}
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/forgot-password')}
                sx={{ alignSelf: 'flex-start' }}
              >
                Change Password
              </Button>
            </Paper>
          </Box>
        )}

        {/* ══ ROLES ══ */}
        {activeSection === 'roles' && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Roles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Expand your presence on TaskMart by becoming a seller or service
              provider
            </Typography>

            {rolesLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Stack spacing={2.5}>
                {/* ── Product Seller Card ── */}
                <Paper
                  elevation={0}
                  sx={{
                    ...styles.card,
                    border: '1px solid',
                    borderColor: sellerProfile ? 'success.main' : 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* accent bar */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 4,
                      height: '100%',
                      bgcolor: sellerProfile ? 'success.main' : 'primary.main',
                      borderRadius: '4px 0 0 4px',
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: sellerProfile
                          ? 'success.light'
                          : 'primary.light',
                        color: sellerProfile ? 'success.main' : 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <StorefrontOutlined />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={0.5}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          color="text.primary"
                        >
                          Product Seller
                        </Typography>
                        {sellerProfile && (
                          <Chip
                            icon={<CheckCircleOutlined sx={{ fontSize: 14 }} />}
                            label={
                              sellerProfile.isApproved
                                ? 'Approved'
                                : 'Pending Approval'
                            }
                            color={
                              sellerProfile.isApproved ? 'success' : 'warning'
                            }
                            size="small"
                            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                          />
                        )}
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={1.5}
                      >
                        List physical or digital products, manage inventory, and
                        process orders — all from one dashboard.
                      </Typography>

                      {sellerProfile ? (
                        <Box>
                          <Divider sx={{ mb: 1.5 }} />
                          <Stack spacing={0.5}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              <strong>Shop name:</strong>{' '}
                              {sellerProfile.shopName}
                            </Typography>
                            {sellerProfile.shopDescription && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}
                              >
                                <strong>Description:</strong>{' '}
                                {sellerProfile.shopDescription}
                              </Typography>
                            )}
                          </Stack>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditOutlined />}
                            onClick={() => navigate('/settings/seller')}
                            sx={{ mt: 2 }}
                          >
                            Manage Shop
                          </Button>
                        </Box>
                      ) : (
                        <Stack direction="row" spacing={1.5} flexWrap="wrap">
                          {[
                            'Set up a shop',
                            'Upload product listings',
                            'Track orders',
                          ].map((f) => (
                            <Stack
                              key={f}
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <CheckCircleOutlined
                                sx={{ fontSize: 14, color: 'text.disabled' }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {f}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Box>

                    {!sellerProfile && (
                      <Button
                        variant="contained"
                        size="small"
                        endIcon={<ArrowForwardOutlined />}
                        onClick={() => navigate('/settings/become-seller')}
                        sx={{ flexShrink: 0 }}
                      >
                        Get Started
                      </Button>
                    )}
                  </Stack>
                </Paper>

                {/* ── Service Provider Card ── */}
                <Paper
                  elevation={0}
                  sx={{
                    ...styles.card,
                    border: '1px solid',
                    borderColor: providerProfile ? 'success.main' : 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 4,
                      height: '100%',
                      bgcolor: providerProfile
                        ? 'success.main'
                        : 'primary.main',
                      borderRadius: '4px 0 0 4px',
                    }}
                  />

                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: providerProfile
                          ? 'success.light'
                          : 'primary.light',
                        color: providerProfile
                          ? 'success.main'
                          : 'primary.main',
                        flexShrink: 0,
                      }}
                    >
                      <HandymanOutlined />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mb={0.5}
                      >
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          color="text.primary"
                        >
                          Service Provider
                        </Typography>
                        {providerProfile && (
                          <Chip
                            icon={<CheckCircleOutlined sx={{ fontSize: 14 }} />}
                            label={
                              providerProfile.isApproved
                                ? 'Approved'
                                : 'Pending Approval'
                            }
                            color={
                              providerProfile.isApproved ? 'success' : 'warning'
                            }
                            size="small"
                            sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                          />
                        )}
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={1.5}
                      >
                        Offer your expertise as a freelancer or agency. Set your
                        own rates and connect with clients looking for your
                        skills.
                      </Typography>

                      {providerProfile ? (
                        <Box>
                          <Divider sx={{ mb: 1.5 }} />
                          <Stack spacing={0.5}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              <strong>Title:</strong> {providerProfile.title}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={0.5}
                              flexWrap="wrap"
                            >
                              {providerProfile.skills?.slice(0, 4).map((s) => (
                                <Chip
                                  key={s}
                                  label={s}
                                  size="small"
                                  sx={{ fontSize: '0.68rem', height: 20 }}
                                />
                              ))}
                              {providerProfile.skills?.length > 4 && (
                                <Chip
                                  label={`+${providerProfile.skills.length - 4}`}
                                  size="small"
                                  sx={{ fontSize: '0.68rem', height: 20 }}
                                />
                              )}
                            </Stack>
                          </Stack>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<EditOutlined />}
                            onClick={() => navigate('/settings/provider')}
                            sx={{ mt: 2 }}
                          >
                            Manage Profile
                          </Button>
                        </Box>
                      ) : (
                        <Stack direction="row" spacing={1.5} flexWrap="wrap">
                          {[
                            'Create a profile',
                            'Add your skills',
                            'Receive service requests',
                          ].map((f) => (
                            <Stack
                              key={f}
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              <CheckCircleOutlined
                                sx={{ fontSize: 14, color: 'text.disabled' }}
                              />
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {f}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      )}
                    </Box>

                    {!providerProfile && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        endIcon={<ArrowForwardOutlined />}
                        onClick={() => navigate('/settings/become-provider')}
                        sx={{ flexShrink: 0 }}
                      >
                        Get Started
                      </Button>
                    )}
                  </Stack>
                </Paper>
              </Stack>
            )}
          </Box>
        )}

        {/* ══ NOTIFICATIONS ══ */}
        {activeSection === 'notifications' && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Notifications
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Choose what you want to be notified about
            </Typography>

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
                ].map((item, i, arr) => (
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
                    {i < arr.length - 1 && <Divider />}
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
                ].map((item, i, arr) => (
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
                    {i < arr.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* ══ PRIVACY ══ */}
        {activeSection === 'privacy' && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Privacy
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Control your visibility and data sharing
            </Typography>

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
                ].map((item, i, arr) => (
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
                    {i < arr.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* ══ Account Actions ══ */}
        {activeSection === 'danger' && (
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="text.primary"
              mb={0.5}
            >
              Account Actions
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Irreversible actions — proceed with caution
            </Typography>

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
