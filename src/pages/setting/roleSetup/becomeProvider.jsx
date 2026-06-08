import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Alert } from '@mui/material'
import { HandymanOutlined } from '@mui/icons-material'

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
  ProviderFormFields,
  SkillsInput,
  ExperienceSlider,
  ProfileStrength,
} from '../../../components/roleSetup'

import { PROVIDER_BENEFITS } from '../../../components/roleSetup/provider/becomeProvider.constants'

export default function BecomeServiceProvider() {
  const navigate = useNavigate()
  const { updateUser } = useContext(AuthContext)

  const [form, setForm] = useState({
    title: '',
    description: '',
    experienceYears: 1,
  })

  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (m, s = 'success') =>
    setSnackbar({ open: true, message: m, severity: s })

  const closeSnackbar = () => setSnackbar((p) => ({ ...p, open: false }))

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Required'
    if (skills.length < 2) e.skills = 'Add skills'
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
      await apiClient('/profiles/providers', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          skills,
          experienceYears: form.experienceYears,
        }),
      })

      await updateUserRole('serviceProvider', navigate)
      updateUser({ role: 'serviceProvider' })

      setSuccess(true)
    } catch (err) {
      showSnackbar(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <SuccessScreen
        title="Profile Submitted!"
        message="Your provider profile is under review."
        primaryLabel="Dashboard"
        onPrimary={() => navigate('/dashboard')}
      />
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <SubmittingBar show={submitting} />

      <RolePageHeader
        title="Become Service Provider"
        onBack={() => navigate('/settings')}
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <ProviderFormFields
            form={form}
            errors={errors}
            onChange={handleChange}
          />

          <SkillsInput
            skills={skills}
            skillInput={skillInput}
            error={errors.skills}
            onInputChange={setSkillInput}
            onRemove={(s) => setSkills((p) => p.filter((x) => x !== s))}
            onAdd={(s) => setSkills((p) => [...p, s])}
          />

          <ExperienceSlider
            value={form.experienceYears}
            onChange={(v) => handleChange('experienceYears', v)}
          />

          <Alert severity="info">
            Profile will be reviewed before approval.
          </Alert>

          <FormActions
            onCancel={() => navigate('/settings')}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitLabel="Submit Profile"
            submitIcon={<HandymanOutlined />}
          />
        </Box>

        <BenefitsSidebar
          title="Provider Benefits"
          icon={<HandymanOutlined />}
          iconBgColor="secondary.light"
          benefits={PROVIDER_BENEFITS}
        >
          <ProfileStrength form={form} skills={skills} />
        </BenefitsSidebar>
      </Stack>

      <FormSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </Box>
  )
}
