import { useState, useRef, KeyboardEvent } from 'react'
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
  Chip,
  Divider,
  Slider,
  InputAdornment,
} from '@mui/material'
import {
  ArrowBackOutlined,
  HandymanOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  InfoOutlined,
  AddOutlined,
  WorkOutlined,
  DescriptionOutlined,
  TitleOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext.js'

const API_BASE = import.meta.env.VITE_API_URL || ''

const SUGGESTED_SKILLS = [
  'Web Development',
  'Graphic Design',
  'Content Writing',
  'SEO',
  'Video Editing',
  'Social Media',
  'Data Entry',
  'Translation',
  'Mobile Development',
  'UI/UX Design',
  'Photography',
  'Accounting',
  'Electrician',
  'Plumbing',
  'AC Repair',
  'Appliance Repair',
  'Carpentry',
  'Painting',
  'Welding',
  'Generator Repair',
  'CCTV Installation',
  'Home Renovation',
  'Tutoring',
  'Driving',
  'Tailoring',
  'Cooking',
  'Cleaning',
  'Gardening',
  'Mechanic',
  'Tiling',
]

const BENEFITS = [
  'Create a public service profile',
  'Receive job requests from buyers',
  'Set your own rates & availability',
  'Build a portfolio of completed work',
  'Get verified badge after 5 reviews',
]

export default function BecomeServiceProvider() {
  const navigate = useNavigate()
  useContext(AuthContext)

  const skillInputRef = useRef(null)

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

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })

  // ── Skills management ─────────────────────────────────────────
  const addSkill = (value) => {
    const trimmed = value.trim()
    if (!trimmed) return
    if (skills.length >= 15) {
      showSnackbar('Maximum 15 skills allowed', 'warning')
      return
    }
    if (skills.map((s) => s.toLowerCase()).includes(trimmed.toLowerCase())) {
      showSnackbar('Skill already added', 'warning')
      return
    }
    setSkills((p) => [...p, trimmed])
    setSkillInput('')
    setErrors((p) => ({ ...p, skills: undefined }))
  }

  const handleSkillKeyDown = (e) => {
    if (['Enter', ',', 'Tab'].includes(e.key)) {
      e.preventDefault()
      addSkill(skillInput)
    }
    if (e.key === 'Backspace' && !skillInput && skills.length) {
      setSkills((p) => p.slice(0, -1))
    }
  }

  const removeSkill = (skill) => setSkills((p) => p.filter((s) => s !== skill))

  const toggleSuggestion = (skill) => {
    if (skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())) {
      removeSkill(skills.find((s) => s.toLowerCase() === skill.toLowerCase()))
    } else {
      addSkill(skill)
    }
  }

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Professional title is required'
    if (form.title.trim().length < 5)
      errs.title = 'Title must be at least 5 characters'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (form.description.trim().length < 50)
      errs.description = 'Description must be at least 50 characters'
    if (skills.length < 2) errs.skills = 'Add at least 2 skills'
    if (form.experienceYears < 0)
      errs.experienceYears = 'Invalid experience value'
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
      const res = await fetch('http://localhost:5000/api/profile/provider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          skills,
          experienceYears: form.experienceYears,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data?.message || 'Something went wrong')

      setSuccess(true)
    } catch (err) {
      showSnackbar(err.message || 'Failed to create provider profile', 'error')
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
            Profile Submitted!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Your service provider profile is under review. Once approved you'll
            appear in search results and can start receiving requests.
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
              onClick={() => navigate('/settings')}
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
              Become a Service Provider
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your professional profile to start offering services
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
            {/* Professional Title */}
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
                mb={0.5}
              >
                Professional Title
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                A short headline that describes what you do — this shows up in
                search results.
              </Typography>
              <TextField
                label="Title"
                fullWidth
                required
                placeholder="e.g. Full-Stack Developer | React & Node.js Expert"
                value={form.title}
                onChange={(e) => {
                  setForm((p) => ({ ...p, title: e.target.value }))
                  setErrors((p) => ({ ...p, title: undefined }))
                }}
                error={!!errors.title}
                helperText={
                  errors.title || `${form.title.length}/100 characters`
                }
                inputProps={{ maxLength: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleOutlined
                        sx={{ color: 'text.disabled', fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>

            {/* Description */}
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
                mb={0.5}
              >
                About Your Services
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Describe what services you offer, your approach, and why clients
                should choose you.
              </Typography>
              <TextField
                label="Description"
                fullWidth
                required
                multiline
                rows={5}
                placeholder="I'm a full-stack developer with 5 years of experience building scalable web apps. I specialize in React, Node.js, and MongoDB. I deliver clean code, meet deadlines, and communicate clearly throughout the project…"
                value={form.description}
                onChange={(e) => {
                  setForm((p) => ({ ...p, description: e.target.value }))
                  setErrors((p) => ({ ...p, description: undefined }))
                }}
                error={!!errors.description}
                helperText={
                  errors.description ||
                  `${form.description.length}/1000 characters — min 50`
                }
                inputProps={{ maxLength: 1000 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: 'flex-start', mt: 1.5 }}
                    >
                      <DescriptionOutlined
                        sx={{ color: 'text.disabled', fontSize: 20 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>

            {/* Skills */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: errors.skills ? 'error.main' : 'divider',
                mb: 2.5,
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
                mb={0.5}
              >
                Skills
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Add up to 15 skills. Type a skill and press Enter, comma, or Tab
                to add it.
              </Typography>

              {/* Chip input box */}
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: errors.skills ? 'error.main' : 'divider',
                  borderRadius: 1.5,
                  p: 1.25,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.75,
                  cursor: 'text',
                  minHeight: 56,
                  '&:focus-within': {
                    borderColor: 'primary.main',
                    boxShadow: (t) => `0 0 0 2px ${t.palette.primary.main}22`,
                  },
                }}
                onClick={() => skillInputRef.current?.focus()}
              >
                {skills.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    onDelete={() => removeSkill(s)}
                    deleteIcon={<CloseOutlined />}
                    color="primary"
                    variant="outlined"
                    sx={{ fontWeight: 500, fontSize: '0.78rem' }}
                  />
                ))}
                <Box
                  component="input"
                  ref={skillInputRef}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder={
                    skills.length === 0 ? 'Type a skill and press Enter…' : ''
                  }
                  sx={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    fontFamily: 'inherit',
                    minWidth: 140,
                    flex: 1,
                    '&::placeholder': { color: 'text.disabled' },
                  }}
                />
              </Box>

              {errors.skills && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: 'block', mt: 0.5 }}
                >
                  {errors.skills}
                </Typography>
              )}

              {/* Suggested skills */}
              <Box mt={2} sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  mb={1}
                  display="block"
                >
                  Suggested skills — click to add:
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: 'wrap',
                    gap: 0.75,
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {SUGGESTED_SKILLS.map((s) => {
                    const active = skills
                      .map((x) => x.toLowerCase())
                      .includes(s.toLowerCase())
                    return (
                      <Chip
                        key={s}
                        label={s}
                        size="small"
                        clickable
                        onClick={() => toggleSuggestion(s)}
                        icon={
                          active ? <CheckCircleOutlined /> : <AddOutlined />
                        }
                        color={active ? 'primary' : 'default'}
                        variant={active ? 'filled' : 'outlined'}
                        sx={{
                          fontSize: '0.72rem',
                          height: 26,
                          '& .MuiChip-icon': { fontSize: 14 },
                        }}
                      />
                    )
                  })}
                </Stack>
              </Box>
            </Paper>

            {/* Years of Experience */}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="text.primary"
                    mb={0.25}
                  >
                    Years of Experience
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    How many years have you been doing this professionally?
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="primary.main"
                    lineHeight={1}
                  >
                    {form.experienceYears}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {form.experienceYears === 1 ? 'year' : 'years'}
                  </Typography>
                </Box>
              </Stack>
              <Slider
                value={form.experienceYears}
                onChange={(_, v) =>
                  setForm((p) => ({ ...p, experienceYears: v }))
                }
                min={0}
                max={30}
                step={1}
                marks={[
                  { value: 0, label: '0' },
                  { value: 5, label: '5' },
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 30, label: '30+' },
                ]}
                sx={{ mt: 2 }}
              />
              <Stack direction="row" justifyContent="space-between" mt={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Just starting out
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Industry veteran
                </Typography>
              </Stack>
            </Paper>

            {/* Info notice */}
            <Alert
              severity="info"
              icon={<InfoOutlined />}
              sx={{ borderRadius: 2, mb: 3 }}
            >
              Your profile will be reviewed by our team. Once approved, buyers
              can discover and contact you directly.
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
                startIcon={<HandymanOutlined />}
              >
                {submitting ? 'Submitting…' : 'Create My Profile'}
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
                    bgcolor: 'secondary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HandymanOutlined
                    sx={{ color: 'secondary.main', fontSize: 20 }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="text.primary"
                >
                  Provider Benefits
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={1.5} mb={3}>
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

              <Divider sx={{ mb: 2 }} />

              {/* Profile strength preview */}
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.primary"
                mb={1}
                display="block"
              >
                Profile Strength
              </Typography>
              {[
                { label: 'Title', done: form.title.trim().length >= 5 },
                {
                  label: 'Description',
                  done: form.description.trim().length >= 50,
                },
                { label: 'Skills (min 2)', done: skills.length >= 2 },
                { label: 'Experience set', done: form.experienceYears >= 0 },
              ].map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={0.75}
                >
                  <CheckCircleOutlined
                    sx={{
                      fontSize: 14,
                      color: item.done ? 'success.main' : 'text.disabled',
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="caption"
                    color={item.done ? 'text.primary' : 'text.disabled'}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              ))}

              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" color="text.secondary">
                By creating a provider account you agree to TaskMart's{' '}
                <Typography
                  component="a"
                  href="/provider-terms"
                  target="_blank"
                  variant="caption"
                  color="primary.main"
                  sx={{ cursor: 'pointer' }}
                >
                  Provider Terms of Service
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
