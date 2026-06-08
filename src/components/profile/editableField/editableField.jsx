import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material'
import { EditOutlined, SaveOutlined, CloseOutlined } from '@mui/icons-material'
import { styles } from './editableField.Styles'

export function EditableField({
  label,
  value,
  icon,
  multiline = false,
  onSave,
  placeholder,
}) {
  const [editing, setEditing] = useState(false)
  const [localVal, setLocalVal] = useState(value || '')

  const handleSave = () => {
    onSave(localVal)
    setEditing(false)
  }
  const handleCancel = () => {
    setLocalVal(value || '')
    setEditing(false)
  }

  if (editing) {
    return (
      <Box>
        <TextField
          label={label}
          value={localVal}
          onChange={(e) => setLocalVal(e.target.value)}
          fullWidth
          multiline={multiline}
          rows={multiline ? 3 : 1}
          size="small"
          autoFocus
          placeholder={placeholder}
          InputProps={{
            startAdornment: icon ? (
              <Box sx={{ mr: 1, display: 'flex', color: 'text.disabled' }}>
                {icon}
              </Box>
            ) : undefined,
          }}
        />
        <Stack direction="row" spacing={1} mt={1}>
          <Button
            size="small"
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<CloseOutlined />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      {icon && (
        <Box sx={{ color: 'text.disabled', mt: 0.2, flexShrink: 0 }}>
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        {value ? (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {value}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.disabled" fontStyle="italic">
            {placeholder || `Add ${label.toLowerCase()}…`}
          </Typography>
        )}
      </Box>
      <Tooltip title={`Edit ${label}`}>
        <IconButton
          size="small"
          onClick={() => setEditing(true)}
          sx={styles.editIcon}
        >
          <EditOutlined sx={{ fontSize: 16 }} />
        </IconButton>
      </Tooltip>
    </Stack>
  )
}
