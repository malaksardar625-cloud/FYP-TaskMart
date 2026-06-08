import { Box, TextField, Chip } from '@mui/material'
import { styles } from './bioField.Styles'

export function BioField({ register, error, bioValue }) {
  return (
    <Box>
      <TextField
        label="Bio"
        fullWidth
        multiline
        rows={3}
        placeholder="Tell others a little about yourself..."
        {...register}
        error={!!error}
        helperText={error?.message}
      />
      <Chip
        label={`${bioValue.length}/500`}
        size="small"
        color={error ? 'error' : bioValue.length > 450 ? 'warning' : 'default'}
        sx={styles.chip}
      />
    </Box>
  )
}
