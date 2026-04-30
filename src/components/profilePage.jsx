import { useState, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Button,
  TextField,
  IconButton,
  Divider,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Skeleton,
  Tooltip,
} from '@mui/material'
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  LocationOnOutlined,
  WorkOutlined,
  CalendarTodayOutlined,
  CameraAltOutlined,
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
  ArrowBackOutlined,
  LinkOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'

const API = 'http://localhost:5000'

// ── API helpers ───────────────────────────────────────────────

const fetchProfile = async () => {
  const res = await fetch(`${API}/api/profile/base/byUser`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to load profile')
  return res.json()
}

const updateProfile = async (updates) => {
  const res = await fetch(`${API}/api/profile/base`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(updates),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data?.message || 'Failed to update profile')
  }
  return res.json()
}

const uploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API}/api/profile/base/avatar`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) throw new Error('Failed to upload avatar')
  return res.json()
}

const uploadCover = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API}/api/profile/base/cover`, {
    method: 'PUT',
    credentials: 'include',
    body: formData,
  })
  if (!res.ok) throw new Error('Failed to upload cover')
  return res.json()
}

// ── Editable Field ────────────────────────────────────────────

function EditableField({
  label,
  value,
  icon,
  multiline = false,
  onSave,
  placeholder,
}) {
  const [editing, setEditing] = useState(false)
  const [localVal, setLocalVal] = useState(value || '')

  const handleSave = () => {
    onSave(localVal)
    setEditing(false)
  }

  const handleCancel = () => {
    setLocalVal(value || '')
    setEditing(false)
  }

  if (editing) {
    return (
      <Box>
        <TextField
          label={label}
          value={localVal}
          onChange={(e) => setLocalVal(e.target.value)}
          fullWidth
          multiline={multiline}
          rows={multiline ? 3 : 1}
          size="small"
          autoFocus
          placeholder={placeholder}
          InputProps={{
            startAdornment: icon ? (
              <Box sx={{ mr: 1, display: 'flex', color: 'text.disabled' }}>
                {icon}
              </Box>
            ) : undefined,
          }}
        />
        <Stack direction="row" spacing={1} mt={1}>
          <Button
            size="small"
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<CloseOutlined />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{ group: true }}
    >
      {icon && (
        <Box sx={{ color: 'text.disabled', mt: 0.2, flexShrink: 0 }}>
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        {value ? (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {value}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.disabled" fontStyle="italic">
            {placeholder || `Add ${label.toLowerCase()}…`}
          </Typography>
        )}
      </Box>
      <Tooltip title={`Edit ${label}`}>
        <IconButton
          size="small"
          onClick={() => setEditing(true)}
          sx={{ opacity: 0.5, '&:hover': { opacity: 1 } }}
        >
          <EditOutlined sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}

// ── Main Page ─────────────────────────────────────────────────

export default function ProfilePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const avatarRef = useRef(null)
  const coverRef = useRef(null)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })
  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  // ── Fetch ──────────────────────────────────────────────────
  const {
    data: raw,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
  })

  const profile = raw?.data || raw || null

  // ── Mutations ──────────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      showSnackbar('Profile updated successfully')
    },
    onError: (err) => showSnackbar(err.message, 'error'),
  })

  const avatarMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      showSnackbar('Profile photo updated')
    },
    onError: () => showSnackbar('Failed to upload photo', 'error'),
  })

  const coverMutation = useMutation({
    mutationFn: uploadCover,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      showSnackbar('Cover photo updated')
    },
    onError: () => showSnackbar('Failed to upload cover', 'error'),
  })

  // ── Field save handler ─────────────────────────────────────
  const handleSave = (field) => (value) => {
    updateMutation.mutate({ [field]: value })
  }

  // ── File handlers ──────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('Image must be under 5 MB', 'error')
      return
    }
    avatarMutation.mutate(file)
  }

  const handleCoverChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      showSnackbar('Cover must be under 10 MB', 'error')
      return
    }
    coverMutation.mutate(file)
  }

  // ── Loading ────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
          <Skeleton
            variant="rectangular"
            height={280}
            sx={{ borderRadius: 3, mb: 2 }}
          />
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ mt: -7, ml: 3 }}
          />
          <Skeleton width={200} height={32} sx={{ mt: 2 }} />
          <Skeleton width={300} height={20} sx={{ mt: 1 }} />
        </Box>
      </Box>
    )
  }

  if (isError || !profile) {
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

  const avatarUrl = profile.profileImage?.file?.url
  const coverUrl = profile.coverImage?.file?.url
  const fullName = profile.fullName || ''
  const userName = profile.user?.userName || ''
  const email = profile.user?.email || ''
  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : null

  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 6 }}>
      <Navbar />

      <Box
        sx={{ maxWidth: 900, mx: 'auto', px: { xs: 1, sm: 2, md: 3 }, pt: 2 }}
      >
        {/* Back button */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackOutlined fontSize="small" />
          </IconButton>
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Back
          </Typography>
        </Stack>

        {/* ── Cover + Avatar card ── */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            mb: 2,
          }}
        >
          {/* Cover photo */}
          <Box
            sx={{
              position: 'relative',
              height: { xs: 180, sm: 260 },
              bgcolor: 'action.hover',
              overflow: 'hidden',
            }}
          >
            {coverUrl ? (
              <Box
                component="img"
                src={coverUrl}
                alt="cover"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(135deg, #667eea22 0%, #764ba222 100%)',
                }}
              />
            )}
            {/* Cover upload button */}
            <Tooltip title="Change cover photo">
              <IconButton
                size="small"
                onClick={() => coverRef.current?.click()}
                disabled={coverMutation.isPending}
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
              >
                {coverMutation.isPending ? (
                  <CircularProgress size={16} />
                ) : (
                  <CameraAltOutlined fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleCoverChange}
            />
          </Box>

          {/* Avatar + name row */}
          <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3 }}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'center', sm: 'flex-end' }}
              sx={{ mt: { xs: -6, sm: -7 } }}
            >
              {/* Avatar with upload overlay */}
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar
                  src={avatarUrl}
                  sx={{
                    width: { xs: 100, sm: 130 },
                    height: { xs: 100, sm: 130 },
                    fontSize: 40,
                    fontWeight: 700,
                    border: '4px solid',
                    borderColor: 'background.paper',
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                  }}
                >
                  {!avatarUrl && initials}
                </Avatar>
                <Tooltip title="Change profile photo">
                  <IconButton
                    size="small"
                    onClick={() => avatarRef.current?.click()}
                    disabled={avatarMutation.isPending}
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      width: 32,
                      height: 32,
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                  >
                    {avatarMutation.isPending ? (
                      <CircularProgress size={14} />
                    ) : (
                      <CameraAltOutlined sx={{ fontSize: 15 }} />
                    )}
                  </IconButton>
                </Tooltip>
                <input
                  ref={avatarRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarChange}
                />
              </Box>

              {/* Name + username + roles */}
              <Box
                sx={{
                  flex: 1,
                  pb: 0.5,
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  {fullName || 'Your Name'}
                </Typography>
                {userName && (
                  <Typography variant="body2" color="text.secondary">
                    @{userName}
                  </Typography>
                )}
                <Stack
                  direction="row"
                  spacing={0.75}
                  flexWrap="wrap"
                  mt={0.75}
                  justifyContent={{ xs: 'center', sm: 'flex-start' }}
                >
                  {profile.role?.map((r) => (
                    <Chip
                      key={r}
                      label={r}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: 22, fontWeight: 600 }}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* ── Two-column layout ── */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems="flex-start"
        >
          {/* ── LEFT: About card ── */}
          <Box sx={{ width: { xs: '100%', md: 340 }, flexShrink: 0 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                mb={2}
              >
                About
              </Typography>

              <Stack spacing={2.5}>
                {/* Bio */}
                <EditableField
                  label="Bio"
                  value={profile.bio}
                  multiline
                  placeholder="Write something about yourself…"
                  onSave={handleSave('bio')}
                />

                <Divider />

                {/* Location */}
                <EditableField
                  label="Location"
                  value={profile.country}
                  icon={<LocationOnOutlined sx={{ fontSize: 18 }} />}
                  placeholder="Add your location"
                  onSave={handleSave('country')}
                />

                {/* Occupation */}
                <EditableField
                  label="Occupation"
                  value={profile.occupation}
                  icon={<WorkOutlined sx={{ fontSize: 18 }} />}
                  placeholder="Add your occupation"
                  onSave={handleSave('occupation')}
                />

                {/* Website */}
                <EditableField
                  label="Website"
                  value={profile.website}
                  icon={<LinkOutlined sx={{ fontSize: 18 }} />}
                  placeholder="Add a link"
                  onSave={handleSave('website')}
                />

                <Divider />

                {/* Read-only info */}
                <Stack spacing={1.5}>
                  {email && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <EmailOutlined
                        sx={{ fontSize: 18, color: 'text.disabled' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {email}
                      </Typography>
                    </Stack>
                  )}
                  {profile.phone && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <PhoneOutlined
                        sx={{ fontSize: 18, color: 'text.disabled' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {profile.phone}
                      </Typography>
                    </Stack>
                  )}
                  {joinedDate && (
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <CalendarTodayOutlined
                        sx={{ fontSize: 18, color: 'text.disabled' }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Joined {joinedDate}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Box>

          {/* ── RIGHT: Editable details card ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Personal Info */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                mb={2}
              >
                Personal Information
              </Typography>
              <Stack spacing={2.5}>
                <EditableField
                  label="Full Name"
                  value={profile.fullName}
                  icon={<PersonOutlined sx={{ fontSize: 18 }} />}
                  placeholder="Enter your full name"
                  onSave={handleSave('fullName')}
                />

                <Divider />

                <EditableField
                  label="Bio"
                  value={profile.bio}
                  multiline
                  placeholder="Tell people about yourself…"
                  onSave={handleSave('bio')}
                />

                <Divider />

                <EditableField
                  label="Location"
                  value={profile.country}
                  icon={<LocationOnOutlined sx={{ fontSize: 18 }} />}
                  placeholder="City, Country"
                  onSave={handleSave('country')}
                />

                <Divider />

                <EditableField
                  label="Occupation"
                  value={profile.occupation}
                  icon={<WorkOutlined sx={{ fontSize: 18 }} />}
                  placeholder="What do you do?"
                  onSave={handleSave('occupation')}
                />

                <Divider />

                <EditableField
                  label="Website"
                  value={profile.website}
                  icon={<LinkOutlined sx={{ fontSize: 18 }} />}
                  placeholder="https://yourwebsite.com"
                  onSave={handleSave('website')}
                />
              </Stack>
            </Paper>

            {/* Contact Info — read only */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="text.primary"
                >
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
                  <EmailOutlined
                    sx={{ fontSize: 18, color: 'text.disabled' }}
                  />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      display="block"
                    >
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {email || '—'}
                    </Typography>
                  </Box>
                </Stack>
                <Divider />
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PhoneOutlined
                    sx={{ fontSize: 18, color: 'text.disabled' }}
                  />
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      display="block"
                    >
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {profile.phone || '—'}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
