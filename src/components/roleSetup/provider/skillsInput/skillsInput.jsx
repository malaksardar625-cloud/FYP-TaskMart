import { useRef } from 'react'
import { Paper, Box, Stack, Typography, Chip } from '@mui/material'
import {
  CloseOutlined,
  CheckCircleOutlined,
  AddOutlined,
} from '@mui/icons-material'
import { SUGGESTED_SKILLS } from '../becomeProvider.constants'
import { styles } from './skillsInput.styles'

export function SkillsInput({
  skills,
  skillInput,
  error,
  onInputChange,
  onKeyDown,
  onRemove,
  onToggle,
}) {
  const inputRef = useRef(null)

  return (
    <Paper
      elevation={0}
      sx={{ ...styles.paper, borderColor: error ? 'error.main' : 'divider' }}
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
        Add up to 15 skills. Type a skill and press Enter, comma, or Tab to add
        it.
      </Typography>

      <Box
        sx={{
          ...styles.chipBox,
          borderColor: error ? 'error.main' : 'divider',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {skills.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            color="primary"
            variant="outlined"
            onDelete={() => onRemove(s)}
            deleteIcon={<CloseOutlined />}
            sx={styles.chip}
          />
        ))}
        <Box
          component="input"
          ref={inputRef}
          value={skillInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            skills.length === 0 ? 'Type a skill and press Enter…' : ''
          }
          sx={styles.nativeInput}
        />
      </Box>

      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ display: 'block', mt: 0.5 }}
        >
          {error}
        </Typography>
      )}

      <Box mt={2}>
        <Typography
          variant="caption"
          color="text.secondary"
          mb={1}
          display="block"
        >
          Suggested skills — click to add:
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
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
                onClick={() => onToggle(s)}
                icon={active ? <CheckCircleOutlined /> : <AddOutlined />}
                color={active ? 'primary' : 'default'}
                variant={active ? 'filled' : 'outlined'}
                sx={styles.suggestion}
              />
            )
          })}
        </Stack>
      </Box>
    </Paper>
  )
}
