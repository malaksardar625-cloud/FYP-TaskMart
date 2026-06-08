import { Paper, Typography, Stack, TextField } from '@mui/material'

export function ShopDetailsForm({ form, errors, onChange }) {
  return (
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
        <TextField
          label="Shop Name"
          fullWidth
          required
          placeholder="e.g. Ahmed's Electronics"
          value={form.shopName}
          onChange={(e) => onChange('shopName', e.target.value)}
          error={!!errors.shopName}
          helperText={
            errors.shopName || `${form.shopName.length}/60 characters`
          }
          inputProps={{ maxLength: 60 }}
        />
        <TextField
          label="Shop Description"
          fullWidth
          required
          multiline
          rows={4}
          placeholder="Tell customers what your shop sells, what makes it unique…"
          value={form.shopDescription}
          onChange={(e) => onChange('shopDescription', e.target.value)}
          error={!!errors.shopDescription}
          helperText={
            errors.shopDescription ||
            `${form.shopDescription.length}/500 characters — min 20`
          }
          inputProps={{ maxLength: 500 }}
        />
      </Stack>
    </Paper>
  )
}
