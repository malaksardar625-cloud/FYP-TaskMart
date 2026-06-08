import { useEffect, useState } from 'react'
import { Box, Stack, IconButton, Typography } from '@mui/material'
import { ArrowBackOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/navbar/navbar'

import {
  ProfileLoading,
  ProfileError,
  ProfileHero,
  AboutCard,
  PersonalInfoCard,
  ContactInfoCard,
  ProfileSnackbar,
} from '../../components/profile'

import {
  getProfile,
  updateProfile,
  uploadAvatar,
  uploadCover,
} from '../../api/profileApi'

export default function ProfilePage() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  const closeSnackbar = () => setSnackbar((p) => ({ ...p, open: false }))

  // -------------------------------
  // LOAD PROFILE
  // -------------------------------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        setError(false)

        const res = await getProfile(navigate)
        setProfile(res?.data || res)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [navigate])

  // -------------------------------
  // UPDATE PROFILE FIELD
  // -------------------------------
  const handleSave = (field) => async (value) => {
    try {
      await updateProfile({ [field]: value }, navigate)

      const updated = await getProfile(navigate)
      setProfile(updated?.data || updated)

      showSnackbar('Profile updated successfully')
    } catch (err) {
      console.error(err)
      showSnackbar(err.message || 'Update failed', 'error')
    }
  }

  // -------------------------------
  // AVATAR UPLOAD
  // -------------------------------
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('Image must be under 5 MB', 'error')
      return
    }

    try {
      await uploadAvatar(file, navigate)

      const updated = await getProfile(navigate)
      setProfile(updated?.data || updated)

      showSnackbar('Profile photo updated')
    } catch (err) {
      console.error(err)
      showSnackbar('Failed to upload photo', 'error')
    }
  }

  // -------------------------------
  // COVER UPLOAD
  // -------------------------------
  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      showSnackbar('Cover must be under 10 MB', 'error')
      return
    }

    try {
      await uploadCover(file, navigate)

      const updated = await getProfile(navigate)
      setProfile(updated?.data || updated)

      showSnackbar('Cover photo updated')
    } catch (err) {
      console.error(err)
      showSnackbar('Failed to upload cover', 'error')
    }
  }

  // -------------------------------
  // LOADING / ERROR STATES
  // -------------------------------
  if (loading) return <ProfileLoading />
  if (error || !profile) return <ProfileError />

  // -------------------------------
  // DERIVED DATA
  // -------------------------------
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
        sx={{
          maxWidth: 900,
          mx: 'auto',
          px: { xs: 1, sm: 2, md: 3 },
          pt: 2,
        }}
      >
        {/* BACK BUTTON */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <IconButton size="small" onClick={() => navigate(-1)}>
            <ArrowBackOutlined fontSize="small" />
          </IconButton>

          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Back
          </Typography>
        </Stack>

        {/* HERO */}
        <ProfileHero
          coverUrl={coverUrl}
          avatarUrl={avatarUrl}
          fullName={fullName}
          userName={userName}
          roles={profile.role}
          initials={initials}
          onAvatarChange={handleAvatarChange}
          onCoverChange={handleCoverChange}
        />

        {/* CONTENT */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems="flex-start"
        >
          <AboutCard
            profile={profile}
            email={email}
            joinedDate={joinedDate}
            onSave={handleSave}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <PersonalInfoCard profile={profile} onSave={handleSave} />

            <ContactInfoCard email={email} phone={profile.phone} />
          </Box>
        </Stack>
      </Box>

      {/* SNACKBAR */}
      <ProfileSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </Box>
  )
}
