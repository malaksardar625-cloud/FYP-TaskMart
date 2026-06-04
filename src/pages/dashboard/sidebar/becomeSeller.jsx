import { useState, useRef } from 'react'
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
  Snackbar,
  IconButton,
  LinearProgress,
  Avatar,
  Divider,
  Chip,
} from '@mui/material'
import {
  ArrowBackOutlined,
  StorefrontOutlined,
  PhotoCameraOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  UploadFileOutlined,
  InfoOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext.js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const BENEFITS = [
  'List unlimited products',
  'Access to seller analytics dashboard',
  'Integrated order management',
  'Direct customer messaging',
  'Promotional tools & discount codes',
]

export default function BecomeProductSeller() {
  const navigate = useNavigate()
  useContext(AuthContext)

  const fileRef = useRef(null)

  const [form, setForm] = useState({
    shopName: '',
    shopDescription: '',
  })
  const [logoFile, setLogoFile] = useState(null) // actual File object
  const [logoPreview, setLogoPreview] = useState(null) // data URL for preview
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  // ── File picker ───────────────────────────────────────────────
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showSnackbar('Please select an image file', 'error')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('Image must be smaller than 5 MB', 'error')
      return
    }

    setLogoFile(file)
    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result)
    reader.readAsDataURL(file)
    setErrors((p) => ({ ...p, logo: undefined }))
  }

  const clearLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.shopName.trim()) errs.shopName = 'Shop name is required'
    if (form.shopName.trim().length < 3)
      errs.shopName = 'Shop name must be at least 3 characters'
    if (!form.shopDescription.trim())
      errs.shopDescription = 'Shop description is required'
    if (form.shopDescription.trim().length < 20)
      errs.shopDescription = 'Description must be at least 20 characters'
    if (!logoFile) errs.logo = 'Shop logo is required'
    return errs
  }

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)
    setErrors({})

    try {
      const formData = new FormData()
      formData.append('shopName', form.shopName.trim())
      formData.append('shopDescription', form.shopDescription.trim())
      formData.append('file', logoFile)

      const res = await fetch('http://localhost:5000/api/profile/seller', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'Something went wrong')
      }

      setSuccess(true)
    } catch (err) {
      showSnackbar(err.message || 'Failed to create seller profile', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Success screen ────────────────────────────────────────────
  if (success) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 480,
            width: '100%',
            p: 5,
            borderRadius: 3,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              bgcolor: 'success.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2.5,
            }}
          >
            <CheckCircleOutlined sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" mb={1}>
            Application Submitted!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Your seller profile has been created and is pending review. You'll
            be notified once it's approved — typically within 24–48 hours.
          </Typography>
          <Stack spacing={1.5}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() =>
                navigate('/settings', { state: { section: 'roles' } })
              }
            >
              Back to Settings
            </Button>
          </Stack>
        </Paper>
      </Box>
    )
  }

  // ── Main form ─────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Loading bar */}
      {submitting && (
        <LinearProgress
          sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
        />
      )}

      <Box sx={{ maxWidth: 960, mx: 'auto' }}>
        {/* Header */}
        <Stack direction="row" spacing={1.5} alignItems="center" mb={4}>
          <IconButton onClick={() => navigate('/settings')} size="small">
            <ArrowBackOutlined fontSize="small" />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Become a Product Seller
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Set up your shop to start listing products on TaskMart
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems="flex-start"
        >
          {/* ── Left: Form ── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Shop Logo */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: errors.logo ? 'error.main' : 'divider',
                mb: 2.5,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                mb={0.5}
              >
                Shop Logo
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                A square image (min 200×200 px). PNG, JPG or WEBP, max 5 MB.
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={logoPreview}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    border: '2px dashed',
                    borderColor: errors.logo ? 'error.main' : 'divider',
                    bgcolor: 'action.hover',
                    cursor: 'pointer',
                  }}
                  onClick={() => fileRef.current?.click()}
                >
                  {!logoPreview && (
                    <StorefrontOutlined
                      sx={{ color: 'text.disabled', fontSize: 32 }}
                    />
                  )}
                </Avatar>

                <Box>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleLogoChange}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<UploadFileOutlined />}
                    onClick={() => fileRef.current?.click()}
                  >
                    {logoFile ? 'Change Logo' : 'Upload Logo'}
                  </Button>
                  {logoFile && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="center"
                      mt={1}
                    >
                      <Chip
                        label={logoFile.name}
                        size="small"
                        onDelete={clearLogo}
                        deleteIcon={<CloseOutlined />}
                        sx={{ maxWidth: 200, fontSize: '0.7rem' }}
                      />
                    </Stack>
                  )}
                  {errors.logo && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {errors.logo}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Paper>

            {/* Shop Details */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                mb: 2.5,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                mb={2}
              >
                Shop Details
              </Typography>
              <Stack spacing={2.5}>
                <Box>
                  <TextField
                    label="Shop Name"
                    fullWidth
                    required
                    placeholder="e.g. Ahmed's Electronics"
                    value={form.shopName}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, shopName: e.target.value }))
                      setErrors((p) => ({ ...p, shopName: undefined }))
                    }}
                    error={!!errors.shopName}
                    helperText={
                      errors.shopName || `${form.shopName.length}/60 characters`
                    }
                    inputProps={{ maxLength: 60 }}
                  />
                </Box>

                <Box>
                  <TextField
                    label="Shop Description"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    placeholder="Tell customers what your shop sells, what makes it unique, and what they can expect from you…"
                    value={form.shopDescription}
                    onChange={(e) => {
                      setForm((p) => ({
                        ...p,
                        shopDescription: e.target.value,
                      }))
                      setErrors((p) => ({ ...p, shopDescription: undefined }))
                    }}
                    error={!!errors.shopDescription}
                    helperText={
                      errors.shopDescription ||
                      `${form.shopDescription.length}/500 characters — min 20`
                    }
                    inputProps={{ maxLength: 500 }}
                  />
                </Box>
              </Stack>
            </Paper>

            {/* Info notice */}
            <Alert
              severity="info"
              icon={<InfoOutlined />}
              sx={{ borderRadius: 2, mb: 3 }}
            >
              Your profile will be reviewed by our team before going live. This
              usually takes 24–48 hours.
            </Alert>

            {/* Actions */}
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={() => navigate('/settings')}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitting}
                startIcon={<StorefrontOutlined />}
              >
                {submitting ? 'Submitting…' : 'Create My Shop'}
              </Button>
            </Stack>
          </Box>

          {/* ── Right: Benefits sidebar ── */}
          <Box sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                position: 'sticky',
                top: 24,
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StorefrontOutlined
                    sx={{ color: 'primary.main', fontSize: 20 }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="text.primary"
                >
                  Seller Benefits
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5}>
                {BENEFITS.map((b) => (
                  <Stack
                    key={b}
                    direction="row"
                    spacing={1}
                    alignItems="flex-start"
                  >
                    <CheckCircleOutlined
                      sx={{
                        fontSize: 16,
                        color: 'success.main',
                        mt: 0.2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {b}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                By creating a seller account you agree to TaskMart's{' '}
                <Typography
                  component="a"
                  href="/seller-terms"
                  target="_blank"
                  variant="caption"
                  color="primary.main"
                  sx={{ cursor: 'pointer' }}
                >
                  Seller Terms of Service
                </Typography>
                .
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Box>

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
