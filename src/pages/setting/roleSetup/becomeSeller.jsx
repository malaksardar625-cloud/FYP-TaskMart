import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Alert } from '@mui/material'
import { StorefrontOutlined } from '@mui/icons-material'

import { apiClient } from '../../../api/apiClient'
import { updateUserRole } from '../../../api/roleApi'
import { AuthContext } from '../../../context/authContext'

import {
  SuccessScreen,
  RolePageHeader,
  BenefitsSidebar,
  FormActions,
  SubmittingBar,
  FormSnackbar,
  LogoUpload,
  ShopDetailsForm,
} from '../../../components/roleSetup'

import { SELLER_BENEFITS } from '../../../components/roleSetup/seller/becomeSeller.constants'

export default function BecomeProductSeller() {
  const navigate = useNavigate()
  const { updateUser } = useContext(AuthContext)

  const [form, setForm] = useState({
    shopName: '',
    shopDescription: '',
  })

  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

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

  const closeSnackbar = () => setSnackbar((p) => ({ ...p, open: false }))

  const handleFieldChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }))
    setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showSnackbar('Only image files allowed', 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showSnackbar('Image must be under 5MB', 'error')
      return
    }

    setLogoFile(file)

    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const e = {}

    if (!form.shopName.trim()) e.shopName = 'Shop name required'
    if (!form.shopDescription.trim()) e.shopDescription = 'Description required'
    if (!logoFile) e.logo = 'Logo required'

    return e
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('shopName', form.shopName.trim())
      formData.append('shopDescription', form.shopDescription.trim())
      formData.append('file', logoFile)

      // ✅ clean API call
      await apiClient('/profiles/sellers', {
        method: 'POST',
        body: formData,
      })

      // ✅ role update (standardized)
      await updateUserRole('productSeller', navigate)
      updateUser({ role: 'productSeller' })

      setSuccess(true)
    } catch (err) {
      showSnackbar(err.message || 'Something went wrong', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <SuccessScreen
        title="Application Submitted!"
        message="Your seller profile is under review."
        primaryLabel="Go to Dashboard"
        onPrimary={() => navigate('/dashboard')}
        secondaryLabel="Back to Settings"
        onSecondary={() => navigate('/settings')}
      />
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <SubmittingBar show={submitting} />

      <RolePageHeader
        title="Become a Product Seller"
        subtitle="Create your shop profile"
        onBack={() => navigate('/settings')}
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <LogoUpload
            logoFile={logoFile}
            logoPreview={logoPreview}
            error={errors.logo}
            onLogoChange={handleLogoChange}
          />

          <ShopDetailsForm
            form={form}
            errors={errors}
            onChange={handleFieldChange}
          />

          <Alert severity="info" sx={{ mb: 2 }}>
            Profile will be reviewed before activation.
          </Alert>

          <FormActions
            onCancel={() => navigate('/settings')}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Create Shop"
            submitIcon={<StorefrontOutlined />}
          />
        </Box>

        <BenefitsSidebar
          title="Seller Benefits"
          icon={<StorefrontOutlined />}
          iconBgColor="primary.light"
          benefits={SELLER_BENEFITS}
        />
      </Stack>

      <FormSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </Box>
  )
}
