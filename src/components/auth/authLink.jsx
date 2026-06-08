import { Typography, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function AuthLink({ text, linkText, to }) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ textAlign: 'center' }}
    >
      {text}{' '}
      <Link component={RouterLink} to={to}>
        {linkText}
      </Link>
    </Typography>
  )
}
