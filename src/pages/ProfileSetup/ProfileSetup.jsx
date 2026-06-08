import { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { profileSetupSchema as schema } from './profileSetupSchema'

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material'

import {
  PersonOutlined,
  PhoneOutlined,
  LocationCityOutlined,
  HomeOutlined,
} from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'
import { styles } from './profileSetup.Styles'
import { AuthContext } from '../../context/authContext'

import {
  SetupBrand,
  SetupProgress,
  BioField,
  CountrySelect,
} from '../../components/profileSetup'

import { ImageUpload } from '../../components/profileSetup/imageUpload/imageUpload'
import { API_BASE } from '../../api/apiConfig'

export default function ProfileSetup() {
  console.log('🚀 PROFILE SETUP MOUNTED')

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const [avatarPreview, setAvatarPreview] = useState('')
  const [coverPreview, setCoverPreview] = useState('')

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

  console.log('🧾 FORM STATE:', { errors })

  const avatarField = register('profileAvatar')
  const coverField = register('profileCover')

  // =========================
  // HANDLERS
  // =========================
  const handleAvatarChange = (e) => {
    console.log('📸 Avatar change triggered')

    avatarField.onChange(e)

    const file = e.target.files?.[0]
    console.log('📸 Avatar file:', file)

    if (file) setAvatarPreview(URL.createObjectURL(file))
  }

  const handleCoverChange = (e) => {
    console.log('🖼️ Cover change triggered')

    coverField.onChange(e)

    const file = e.target.files?.[0]
    console.log('🖼️ Cover file:', file)

    if (file) setCoverPreview(URL.createObjectURL(file))
  }

  const onSubmit = async (data) => {
    console.log('📨 FORM SUBMIT DATA:', data)

    setLoading(true)
    setServerError('')

    try {
      const formData = new FormData()

      formData.append('fullName', data.fullName)

      if (data.phone) formData.append('phone', data.phone)
      if (data.bio) formData.append('bio', data.bio)
      if (data.country) formData.append('country', data.country)
      if (data.city) formData.append('city', data.city)
      if (data.address) formData.append('address', data.address)

      if (data.profileAvatar?.[0]) {
        console.log('📤 uploading avatar')
        formData.append('profileAvatar', data.profileAvatar[0])
      }

      if (data.profileCover?.[0]) {
        console.log('📤 uploading cover')
        formData.append('profileCover', data.profileCover[0])
      }

      console.log('🌐 API CALL →', `${API_BASE}/profiles/buyers`)

      const response = await fetch(`${API_BASE}/profiles/buyers`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      console.log('📡 RESPONSE STATUS:', response.status)

      const result = await response.json()
      console.log('📦 RESPONSE DATA:', result)

      if (!response.ok) {
        setServerError(result.message || 'Failed to save profile.')
        return
      }

      login(result.data?.user || result.data)

      console.log('✅ PROFILE CREATED SUCCESSFULLY')

      navigate('/dashboard')
    } catch (err) {
      console.error('❌ PROFILE SETUP ERROR:', err)
      setServerError('Network error. Please check your connection.')
    } finally {
      setLoading(false)
      console.log('⏳ LOADING FINISHED')
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.container}>
        <SetupBrand />
        <SetupProgress step={2} total={3} pct={66} />

        <Paper elevation={0} sx={styles.card}>
          <Typography variant="h5" fontWeight={700}>
            Your profile
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
            {/* AVATAR */}
            <ImageUpload
              label="Profile Avatar"
              preview={avatarPreview}
              shape="circle"
              height={120}
              onChange={handleAvatarChange}
              {...avatarField}
            />

            {/* COVER */}
            <ImageUpload
              label="Profile Cover"
              preview={coverPreview}
              shape="rectangle"
              height={180}
              onChange={handleCoverChange}
              {...coverField}
            />

            <Divider />

            <TextField
              label="Full name *"
              fullWidth
              {...register('fullName')}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />

            <TextField label="Phone number" fullWidth {...register('phone')} />

            <BioField
              register={register('bio')}
              error={errors.bio}
              bioValue={bioValue}
            />

            <Divider />

            <CountrySelect control={control} error={errors.country} />

            <TextField {...register('city')} label="City" fullWidth />
            <TextField {...register('address')} label="Address" fullWidth />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} />
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
