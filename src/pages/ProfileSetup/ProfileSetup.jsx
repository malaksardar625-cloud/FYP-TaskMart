import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { profileSetupSchema as schema } from '../ProfileSetup/profileSetupSchema.js'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  Alert,
  CircularProgress,
  Stack,
  LinearProgress,
  Divider,
  Chip,
  Autocomplete,
} from '@mui/material'
import {
  PersonOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  LocationCityOutlined,
  HomeOutlined,
  InfoOutlined,
  ImageOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from './ProfileSetup.styles.js'

const COUNTRIES = [
  'Pakistan',
  'India',
  'Bangladesh',
  'Sri Lanka',
  'Nepal',
  'Afghanistan',
  'Bhutan',
  'Maldives',
  'Iran',
]

export default function ProfileSetup() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: { country: 'Pakistan' },
  })

  const bioValue = watch('bio') || ''

  // ✅ Split onChange so both RHF and preview work
  const { onChange: rhfOnChange, ...restImageRegister } =
    register('profileImage')

  const onSubmit = async (data) => {
    setLoading(true)
    setServerError('')
    try {
      const formData = new FormData()
      formData.append('fullName', data.fullName)
      formData.append('phone', data.phone || '')
      formData.append('bio', data.bio || '')
      formData.append('country', data.country || '')
      formData.append('city', data.city || '')
      formData.append('address', data.address || '')

      if (data.profileImage?.[0]) {
        formData.append('file', data.profileImage[0])
      }

      const response = await fetch('/api/profile/base', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        setServerError(result.message || 'Failed to save profile.')
        return
      }
      navigate('/dashboard')
    } catch {
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        {/* Brand */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box sx={styles.logoMark} />
          <Typography variant="h6" fontWeight={700}>
            TaskMart
          </Typography>
        </Stack>

        {/* Progress */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 2,
            mb: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Step 2 of 3 — Set up your profile
          </Typography>
          <Typography variant="caption" color="primary" fontWeight={600}>
            66%
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={66}
            sx={{ borderRadius: 2, height: 6 }}
          />
        </Box>

        <Paper elevation={0} sx={styles.card}>
          <Typography variant="h5" fontWeight={700}>
            Your profile
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            This info will be visible on your public profile.
          </Typography>

          {serverError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {serverError}
            </Alert>
          )}

          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={3}
            sx={{ mt: 3 }}
          >
            {/* IMAGE UPLOAD */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar src={avatarPreview} sx={styles.avatar}>
                  {!avatarPreview && <PersonOutlined />}
                </Avatar>
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<ImageOutlined />}
                    size="small"
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg,image/png, image/webp"
                      {...restImageRegister}
                      onChange={(e) => {
                        rhfOnChange(e)
                        const file = e.target.files?.[0]
                        if (file) setAvatarPreview(URL.createObjectURL(file))
                      }}
                    />
                  </Button>
                  {/* Image validation error */}
                  {errors.profileImage ? (
                    <Typography
                      variant="caption"
                      color="error"
                      display="block"
                      sx={{ mt: 0.5 }}
                    >
                      {errors.profileImage.message}
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      sx={{ mt: 0.5 }}
                    >
                      <br />
                      <InfoOutlined
                        sx={{ fontSize: 12, mr: 0.4, verticalAlign: 'middle' }}
                      />
                      JPEG, WEBP, PNG | Max 3 MB | 1:1 (square)*
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>

            <Divider />

            {/* Full Name error shown */}
            <TextField
              label="Full name *"
              fullWidth
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Phone error shown */}
            <TextField
              label="Phone number"
              fullWidth
              placeholder="+92 300 1234567"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message || 'Optional'}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Bio error + character count */}
            <Box>
              <TextField
                label="Bio"
                fullWidth
                multiline
                rows={3}
                placeholder="Tell others a little about yourself..."
                {...register('bio')}
                error={!!errors.bio}
                helperText={errors.bio?.message}
              />
              <Chip
                label={`${bioValue.length}/500`}
                size="small"
                color={
                  errors.bio
                    ? 'error'
                    : bioValue.length > 450
                      ? 'warning'
                      : 'default'
                }
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Divider />

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={COUNTRIES}
                  value={field.value || 'Pakistan'}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  isOptionEqualToValue={(option, value) => option === value}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationOnOutlined fontSize="small" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country *"
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              )}
            />

            {/* City error shown */}
            <TextField
              label="City"
              fullWidth
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCityOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Address error shown */}
            <TextField
              label="Address"
              fullWidth
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ borderRadius: 2, py: 1.2 }}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                'Save Profile & Continue'
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  )
}
