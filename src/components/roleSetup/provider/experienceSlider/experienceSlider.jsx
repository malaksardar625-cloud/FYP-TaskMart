import { Paper, Stack, Box, Typography, Slider } from '@mui/material'
import { styles, MARKS } from './experienceSlider.Styles'

export function ExperienceSlider({ value, onChange }) {
  return (
    <Paper elevation={0} sx={styles.paper}>
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
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {value === 1 ? 'year' : 'years'}
          </Typography>
        </Box>
      </Stack>
      <Slider
        value={value}
        onChange={(_, v) => onChange(v)}
        min={0}
        max={30}
        step={1}
        marks={MARKS}
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
  )
}
