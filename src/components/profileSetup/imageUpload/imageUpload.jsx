import { Box, Typography } from '@mui/material'
import { useRef } from 'react'

export function ImageUpload({
  label,
  preview,
  onChange,
  name,
  inputRef,
  shape = 'rectangle', // 'circle' | 'rectangle' | 'square'
  height = 160,
}) {
  const fileRef = useRef(null)

  const handleClick = () => {
    fileRef.current?.click()
  }

  const borderRadius =
    shape === 'circle' ? '50%' : shape === 'square' ? '12px' : '12px'

  const width = shape === 'circle' ? 120 : '100%'

  return (
    <Box>
      {label && (
        <Typography variant="body2" fontWeight={600} mb={1}>
          {label}
        </Typography>
      )}

      <Box
        onClick={handleClick}
        sx={{
          width,
          height,
          borderRadius,
          border: '2px dashed #ccc',
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f9f9f9',
          transition: '0.2s',

          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="upload"
            style={{
              width: '100%',
              height: '100%',
              objectFit: shape === 'circle' ? 'cover' : 'cover',
            }}
          />
        ) : (
          <Typography variant="caption" color="text.secondary">
            Click to upload
          </Typography>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          hidden
          ref={(el) => {
            fileRef.current = el
            if (inputRef) inputRef(el)
          }}
          name={name}
          onChange={onChange}
        />
      </Box>
    </Box>
  )
}
