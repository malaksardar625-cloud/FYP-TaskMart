import { Stack, Typography, Divider } from '@mui/material'
import { CheckCircleOutlined } from '@mui/icons-material'

export function ProfileStrength({ form, skills }) {
  const items = [
    { label: 'Title', done: form.title.trim().length >= 5 },
    { label: 'Description', done: form.description.trim().length >= 50 },
    { label: 'Skills (min 2)', done: skills.length >= 2 },
    { label: 'Experience set', done: form.experienceYears >= 0 },
  ]

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Typography
        variant="caption"
        fontWeight={600}
        color="text.primary"
        mb={1}
        display="block"
      >
        Profile Strength
      </Typography>
      {items.map((item) => (
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
    </>
  )
}
