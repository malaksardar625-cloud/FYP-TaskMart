import { useRef } from 'react'
import { Stack, TextField, Typography } from '@mui/material'

export function OtpInput({ value, onChange, length = 6, error }) {
  const refs = useRef([])

  const digits =
    Array.isArray(value) && value.length === length
      ? value
      : Array(length).fill('')

  const handleChange = (index, raw) => {
    if (!/^[0-9]?$/.test(raw)) return // digits only
    const next = [...digits]
    next[index] = raw
    onChange(next)
    if (raw && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)
    if (!pasted) return
    const next = [...digits]
    pasted.split('').forEach((ch, i) => {
      next[i] = ch
    })
    onChange(next)
    const focusIndex = Math.min(pasted.length, length - 1)
    refs.current[focusIndex]?.focus()
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ mt: 3, justifyContent: 'center' }}
        onPaste={handlePaste}
      >
        {digits.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputRef={(el) => (refs.current[index] = el)}
            slotProps={{
              htmlInput: {
                maxLength: 1,
                inputMode: 'numeric',
                style: { textAlign: 'center', fontSize: 22, fontWeight: 700 },
              },
            }}
            sx={{ width: 48 }}
            error={!!error}
          />
        ))}
      </Stack>

      {error && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 1, display: 'block', textAlign: 'center' }}
        >
          {error}
        </Typography>
      )}
    </>
  )
}
