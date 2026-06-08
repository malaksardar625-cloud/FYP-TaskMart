import { Paper, Typography, TextField, InputAdornment } from '@mui/material'
import { TitleOutlined, DescriptionOutlined } from '@mui/icons-material'

export function ProviderFormFields({ form, errors, onChange }) {
  return (
    <>
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
          A short headline that describes what you do — shows up in search
          results.
        </Typography>
        <TextField
          label="Title"
          fullWidth
          required
          placeholder="e.g. Full-Stack Developer | React & Node.js Expert"
          value={form.title}
          onChange={(e) => onChange('title', e.target.value)}
          error={!!errors.title}
          helperText={errors.title || `${form.title.length}/100 characters`}
          inputProps={{ maxLength: 100 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleOutlined sx={{ color: 'text.disabled', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

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
          placeholder="I'm a full-stack developer with 5 years of experience…"
          value={form.description}
          onChange={(e) => onChange('description', e.target.value)}
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
    </>
  )
}
