import { Controller } from 'react-hook-form'
import { TextField, InputAdornment, Autocomplete } from '@mui/material'
import { LocationOnOutlined } from '@mui/icons-material'
import { COUNTRIES } from '../profileSetup.constants'

export function CountrySelect({ control, error }) {
  return (
    <Controller
      name="country"
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={COUNTRIES}
          value={field.value || 'Pakistan'}
          onChange={(_, newValue) => field.onChange(newValue ?? '')}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country *"
              fullWidth
              error={!!error}
              helperText={error?.message}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOnOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      )}
    />
  )
}
